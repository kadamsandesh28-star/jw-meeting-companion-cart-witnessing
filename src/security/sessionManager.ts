/**
 * ==========================================================
 * My JW Companion
 * Session Manager
 * ==========================================================
 *
 * Tracks the lifetime of the current unlocked session.
 */

import { SessionState } from "./types";

class SessionManager {
  /**
   * Current session state.
   */
  private session: SessionState = {
    unlocked: false,
    unlockedAt: null,
    lastActivity: null,
  };

  /**
   * Session expiry timestamp.
   */
  private expiresAt: number | null = null;

  /**
   * Starts a new session.
   */
  public start(durationMinutes: number): void {
    const now = Date.now();

    this.session = {
      unlocked: true,
      unlockedAt: now,
      lastActivity: now,
    };

    this.expiresAt = now + durationMinutes * 60 * 1000;
  }

  /**
   * Ends the current session.
   */
  public end(): void {
    this.session = {
      unlocked: false,
      unlockedAt: null,
      lastActivity: null,
    };

    this.expiresAt = null;
  }

  /**
   * Returns the current session state.
   */
  public getSession(): SessionState {
    return { ...this.session };
  }

  /**
   * Returns true if the session is still valid.
   */
  public isUnlocked(): boolean {
    if (!this.session.unlocked) {
      return false;
    }

    if (this.expiresAt === null) {
      return false;
    }

    if (Date.now() >= this.expiresAt) {
      this.end();
      return false;
    }

    return true;
  }

  /**
   * Extends the session timeout.
   */
  public extend(durationMinutes: number): void {
    if (!this.session.unlocked) {
      return;
    }

    this.touch();

    this.expiresAt =
      Date.now() + durationMinutes * 60 * 1000;
  }

  /**
   * Updates the last activity timestamp.
   */
  public touch(): void {
    if (!this.session.unlocked) {
      return;
    }

    this.session.lastActivity = Date.now();
  }

  /**
   * Returns the remaining session time in milliseconds.
   */
  public remainingTime(): number {
    if (!this.isUnlocked() || this.expiresAt === null) {
      return 0;
    }

    return Math.max(
      0,
      this.expiresAt - Date.now()
    );
  }
}

export const sessionManager = new SessionManager();