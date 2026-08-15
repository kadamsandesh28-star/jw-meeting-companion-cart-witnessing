/**
 * ==========================================================
 * My JW Companion
 * Security Types
 * ==========================================================
 *
 * Shared interfaces and type definitions used throughout the
 * application's security layer.
 */

/**
 * Encrypted data payload stored in local storage or exported
 * for backup.
 */
export interface EncryptedPayload {
  /** Base64 encoded PBKDF2 salt */
  salt: string;

  /** Base64 encoded AES-GCM initialization vector */
  iv: string;

  /** Base64 encoded encrypted data */
  data: string;
}

/**
 * Information about the currently authenticated session.
 */
export interface SessionState {
  /** True while the workspace is unlocked */
  unlocked: boolean;

  /** Timestamp when the session was unlocked */
  unlockedAt: number | null;

  /** Timestamp of the last user activity */
  lastActivity: number | null;
}

/**
 * Stored passcode metadata.
 */
export interface PasscodeRecord {
  /** Salt used during PBKDF2 key derivation */
  salt: string;

  /** Verification token encrypted with the derived key */
  verifier: EncryptedPayload;

  /** Creation timestamp */
  createdAt: number;
}

/**
 * Configuration values used by the security services.
 */
export interface SecurityConfig {
  /** PBKDF2 iteration count */
  iterations: number;

  /** AES key length */
  keyLength: 128 | 192 | 256;

  /** Automatic lock timeout (milliseconds) */
  sessionTimeout: number;
}