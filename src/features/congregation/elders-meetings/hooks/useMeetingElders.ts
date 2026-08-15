import { bodyMemberService } from "../../body-of-elders/services/bodyMemberService";
import { publisherService } from "../../publishers/services/publisherService";

export interface MeetingElder {
  id: string;
  name: string;
  role: string;
}

export function useMeetingElders(): MeetingElder[] {
  return bodyMemberService
    .getAll()
    .filter((member) => member.active)
    .map((member) => {
      const publisher = publisherService
        .getAll()
        .find((p) => p.id === member.publisherId);

      return {
        id: member.id,
        name: publisher
          ? `${publisher.firstName} ${publisher.lastName}`
          : "Unknown Publisher",
        role: member.role,
      };
    });
}