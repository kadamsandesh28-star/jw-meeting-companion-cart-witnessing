import { sampleBodyMembers } from "../data/sampleBodyMembers";
import { BodyMember } from "../types/bodyMember";

const STORAGE_KEY = "jw-body-members";

class BodyMemberService {
  private initialize() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sampleBodyMembers)
      );
    }
  }

  getAll(): BodyMember[] {
    this.initialize();

    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]"
    );
  }

  getById(id: string): BodyMember | undefined {
    return this.getAll().find(
      (member) => member.id === id
    );
  }

  add(member: BodyMember) {
    const members = this.getAll();

    members.push(member);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(members)
    );
  }

  update(updated: BodyMember) {
    const members = this.getAll().map((member) =>
      member.id === updated.id
        ? updated
        : member
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(members)
    );
  }

  delete(id: string) {
    const members = this.getAll().filter(
      (member) => member.id !== id
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(members)
    );
  }
}

export const bodyMemberService =
  new BodyMemberService();