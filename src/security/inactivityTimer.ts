/**
 * ==========================================================
 * My JW Companion
 * Inactivity Timer
 * ==========================================================
 *
 * Monitors user activity and automatically locks the secure
 * workspace after a period of inactivity.
 */

import { sessionManager } from "./sessionManager";

class InactivityTimer {
  /**
   * Active timeout identifier.
   */
  private timeoutId: number | null = null;

  /**
   * Timeout duration in milliseconds.
   */
  private timeout = 10 * 60 * 1000;

  /**
   * Callback invoked when the inactivity timeout expires.
   */
  private onTimeout: (() => void) | null = null;

  /**
   * Browser events that indicate user activity.
   */
  private readonly events = [
    "mousemove",
    "mousedown",
    "keydown",
    "touchstart",
    "scroll",
    "click",
  ] as const;

  /**
   * Starts monitoring user activity.
   */
  public start(
    timeoutMinutes: number,
    callback: () => void
  ): void {
    this.stop();

    this.timeout = timeoutMinutes * 60 * 1000;
    this.onTimeout = callback;

    this.events.forEach((event) =>
      window.addEventListener(event, this.reset)
    );

    this.reset();
  }

  /**
   * Stops monitoring user activity.
   */
  public stop(): void {
    this.events.forEach((event) =>
      window.removeEventListener(event, this.reset)
    );

    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.onTimeout = null;
  }

  /**
   * Resets the inactivity timer and updates the session's
   * last activity timestamp.
   */
  private reset = (): void => {
    sessionManager.touch();

    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      this.onTimeout?.();
    }, this.timeout);
  };
}

/**
 * Singleton inactivity timer.
 */
export const inactivityTimer = new InactivityTimer();