export interface Department {
  id: string;

  name: string;

  description: string;

  /**
   * Emoji or icon representing the department.
   * Example: 📚 🎤 🧹
   */
  icon?: string;

  /**
   * Publisher ID of the department overseer.
   */
  overseerId?: string;

  /**
   * Publisher ID of the assistant.
   */
  assistantId?: string;

  /**
   * All members assigned to this department.
   */
  memberIds?: string[];

  /**
   * Key brothers serving in this department
   * (used by the dashboard and quick access).
   */
  keyMemberPublisherIds: string[];

  /**
   * Whether the department is active.
   */
  active: boolean;

  createdAt: string;

  updatedAt: string;
}