/**
 * ==========================================================
 * My JW Companion
 * Passcode Service
 * ==========================================================
 *
 * Creates and unlocks the Secure Elder Workspace.
 */

import {
  deriveKey,
  encryptWithKey,
  decryptWithKey,
  generateSalt,
} from "./cryptoService";

import { authService } from "./authService";

import { EncryptedPayload } from "./types";

const STORAGE_KEY = "jw-elder-security";

const VERIFICATION_TOKEN = "MyJWCompanion";

/**
 * Data stored in Local Storage to verify the user's passcode.
 */
interface WorkspaceMetadata {
  verification: EncryptedPayload;
}

class PasscodeService {
  /**
   * Returns true if the secure workspace has already been created.
   */
  public exists(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }

  /**
   * Creates a new secure workspace.
   */
  public async create(passcode: string): Promise<void> {
    if (this.exists()) {
      throw new Error("Secure workspace already exists.");
    }

    const salt = generateSalt();

    const key = await deriveKey(passcode, salt);

    const verification = await encryptWithKey(
      VERIFICATION_TOKEN,
      key,
      salt
    );

    const metadata: WorkspaceMetadata = {
      verification,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(metadata)
    );

    authService.unlock(key);
  }

  /**
   * Attempts to unlock the secure workspace.
   *
   * Returns true only if the supplied passcode
   * successfully decrypts the verification token.
   */
  public async unlock(passcode: string): Promise<boolean> {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return false;
    }

    const metadata: WorkspaceMetadata = JSON.parse(raw);

    const salt = Uint8Array.from(
      atob(metadata.verification.salt),
      (c) => c.charCodeAt(0)
    );

    const key = await deriveKey(passcode, salt);

    try {
      const token = await decryptWithKey<string>(
        metadata.verification,
        key
      );

      if (token !== VERIFICATION_TOKEN) {
        return false;
      }

      authService.unlock(key);

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Locks the workspace.
   */
  public lock(): void {
    authService.lock();
  }

  /**
   * Removes the secure workspace completely.
   *
   * Intended for future use when resetting the application.
   */
  public reset(): void {
    authService.lock();
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const passcodeService = new PasscodeService();