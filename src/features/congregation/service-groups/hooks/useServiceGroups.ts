import { useCallback, useMemo, useState } from "react";

import { serviceGroupService } from "../services/serviceGroupService";
import { ServiceGroup } from "../types/serviceGroup";

export function useServiceGroups() {
  const [search, setSearch] = useState("");
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>(
    () => serviceGroupService.getAll()
  );

  const refresh = useCallback(() => {
    setServiceGroups(serviceGroupService.getAll());
  }, []);

  const filteredServiceGroups = useMemo(() => {
    return serviceGroups.filter((group) =>
      group.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [serviceGroups, search]);

  return {
    serviceGroups: filteredServiceGroups,
    search,
    setSearch,
    refresh,
  };
}