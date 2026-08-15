import { useCallback, useMemo, useState } from "react";

import { territoryService } from "../services/territoryService";
import { Territory } from "../types/territory";

export function useTerritories() {
  const [search, setSearch] = useState("");

  const [territories, setTerritories] = useState<Territory[]>(
    () => territoryService.getAll()
  );

  const refresh = useCallback(() => {
    setTerritories(territoryService.getAll());
  }, []);

  const filteredTerritories = useMemo(() => {
    return territories.filter(
      (territory) =>
        territory.number
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        territory.name
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [territories, search]);

  return {
    territories: filteredTerritories,
    search,
    setSearch,
    refresh,
  };
}