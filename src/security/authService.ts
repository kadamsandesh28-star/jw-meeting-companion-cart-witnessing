/**
 * ==========================================================
 * My JW Companion
 * Authentication Service
 * ==========================================================
 *
 * Manages the current unlocked workspace session.
 *
 * The encryption key is kept only in memory and is never
 * persisted to local storage.
 */

class AuthService {
  /**
   * Active encryption key for the current session.
   * Null indicates that the workspace is locked.
   */
  private cryptoKey: CryptoKey | null = null;

  /**
   * Returns true if the secure workspace is unlocked.
   */
  public isUnlocked(): boolean {
    return this.cryptoKey !== null;
  }

  /**
   * Stores the active encryption key in memory.
   */
  public unlock(key: CryptoKey): void {
    this.cryptoKey = key;
  }

  /**
   * Locks the current workspace by removing the
   * encryption key from memory.
   */
  public lock(): void {
    this.cryptoKey = null;
  }

  /**
   * Returns the active CryptoKey.
   *
   * Throws an error if the workspace is locked.
   */
  public getKey(): CryptoKey {
    if (this.cryptoKey === null) {
      throw new Error(
        "Secure workspace is locked. Unlock the workspace before accessing encrypted data."
      );
    }

    return this.cryptoKey;
  }

  /**
   * Returns the active CryptoKey if available,
   * otherwise null.
   *
   * Useful for services that can gracefully
   * handle a locked workspace.
   */
  public getOptionalKey(): CryptoKey | null {
    return this.cryptoKey;
  }
}

/**
 * Singleton authentication service.
 */
export const authService = new AuthService();