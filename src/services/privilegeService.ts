import { Privilege, PrivilegeType } from "../features/congregation/publishers/models/Privilege";

let privileges: Privilege[] = [];

export const privilegeService = {
  /**
   * Returns all privileges.
   */
  getAll(): Privilege[] {
    return privileges;
  },

  /**
   * Returns a privilege by ID.
   */
  getById(id: string): Privilege | undefined {
    return privileges.find((privilege) => privilege.id === id);
  },

  /**
   * Creates a new privilege.
   */
  create(privilege: Privilege): void {
    privileges.push(privilege);
  },

  /**
   * Updates an existing privilege.
   */
  update(updatedPrivilege: Privilege): boolean {
    const index = privileges.findIndex(
      (privilege) => privilege.id === updatedPrivilege.id
    );

    if (index === -1) {
      return false;
    }

    privileges[index] = updatedPrivilege;

    return true;
  },

  /**
   * Deletes a privilege.
   */
  delete(id: string): boolean {
    const index = privileges.findIndex(
      (privilege) => privilege.id === id
    );

    if (index === -1) {
      return false;
    }

    privileges.splice(index, 1);

    return true;
  },

  /**
   * Returns privileges by type.
   */
  getByType(type: PrivilegeType): Privilege[] {
    return privileges.filter(
      (privilege) => privilege.type === type
    );
  },

  /**
   * Returns only active privileges.
   */
  getActive(): Privilege[] {
    return privileges.filter(
      (privilege) => privilege.active
    );
  },

  /**
   * Clears all privileges.
   * Useful during development and testing.
   */
  clear(): void {
    privileges = [];
  }
};