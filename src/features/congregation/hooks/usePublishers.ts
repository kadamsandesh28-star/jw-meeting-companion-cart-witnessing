import { useMemo, useState } from "react";

import { publisherService } from "../publishers/services/publisherService";

export function usePublishers() {
  const [search, setSearch] = useState("");

  const publishers = publisherService.getAll();

  const filteredPublishers = useMemo(() => {
    return publishers.filter((publisher) => {
      const fullName =
        `${publisher.firstName} ${publisher.lastName}`.toLowerCase();

      return fullName.includes(search.toLowerCase());
    });
  }, [publishers, search]);

  return {
    publishers: filteredPublishers,
    search,
    setSearch,
  };
}