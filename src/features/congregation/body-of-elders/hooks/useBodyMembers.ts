import { useEffect, useState } from "react";

import { bodyMemberService } from "../services/bodyMemberService";
import { BodyMember } from "../types/bodyMember";

export function useBodyMembers() {
  const [bodyMembers, setBodyMembers] = useState<BodyMember[]>([]);
  const [search, setSearch] = useState("");

  const refresh = () => {
    setBodyMembers(bodyMemberService.getAll());
  };

  useEffect(() => {
    refresh();
  }, []);

  const filteredBodyMembers = bodyMembers.filter((member) =>
    member.role.toLowerCase().includes(search.toLowerCase())
  );

  return {
    bodyMembers: filteredBodyMembers,
    search,
    setSearch,
    refresh,
  };
}