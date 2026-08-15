/**
 * ==========================================================
 * My JW Companion
 * Crypto Service
 * ==========================================================
 */
import { EncryptedPayload } from "./types";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const ITERATIONS = 100000;
const KEY_LENGTH = 256;

/**
 * Converts a Uint8Array into one backed by a plain ArrayBuffer.
 * Required for TypeScript 6 Web Crypto typings.
 */
function normalizeBuffer(data: Uint8Array): Uint8Array<ArrayBuffer> {
  return new Uint8Array(data) as Uint8Array<ArrayBuffer>;
}

function toBase64(data: Uint8Array): string {
  return btoa(String.fromCharCode(...data));
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

/**
 * Creates a new random salt.
 */
export function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16));
}

/**
 * Derives an AES key from the supplied passcode and salt.
 */
export async function deriveKey(
  passcode: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(passcode),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: normalizeBuffer(salt),
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: KEY_LENGTH,
    },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypt using an existing CryptoKey.
 */
export async function encryptWithKey<T>(
  value: T,
  key: CryptoKey,
  salt: Uint8Array
): Promise<EncryptedPayload> {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const plaintext = encoder.encode(JSON.stringify(value));

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: normalizeBuffer(iv),
    },
    key,
    plaintext
  );

  return {
    salt: toBase64(salt),
    iv: toBase64(iv),
    data: toBase64(new Uint8Array(encrypted)),
  };
}

/**
 * Decrypt using an existing CryptoKey.
 */
export async function decryptWithKey<T>(
  payload: EncryptedPayload,
  key: CryptoKey
): Promise<T> {
  const iv = fromBase64(payload.iv);
  const encrypted = fromBase64(payload.data);

  const decrypted = await crypto.subtle.decrypt(
  {
    name: "AES-GCM",
    iv: normalizeBuffer(iv),
  },
  key,
  normalizeBuffer(encrypted)
);
  return JSON.parse(
    decoder.decode(new Uint8Array(decrypted))
  ) as T;
}

/**
 * Encrypt directly from a passcode.
 */
export async function encrypt<T>(
  value: T,
  passcode: string
): Promise<EncryptedPayload> {
  const salt = generateSalt();

  const key = await deriveKey(passcode, salt);

  return encryptWithKey(value, key, salt);
}

/**
 * Decrypt directly from a passcode.
 */
export async function decrypt<T>(
  payload: EncryptedPayload,
  passcode: string
): Promise<T> {
  const salt = fromBase64(payload.salt);

  const key = await deriveKey(passcode, salt);

  return decryptWithKey(payload, key);
}