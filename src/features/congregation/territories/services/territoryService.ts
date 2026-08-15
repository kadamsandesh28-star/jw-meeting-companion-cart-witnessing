import { sampleTerritories } from "../data/sampleTerritories";
import { Territory } from "../types/territory";

const STORAGE_KEY = "territories";

class TerritoryService {
  private load(): Territory[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      this.save(sampleTerritories);
      return sampleTerritories;
    }

    return JSON.parse(data) as Territory[];
  }

  private save(territories: Territory[]) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(territories)
    );
  }

  getAll(): Territory[] {
    return this.load();
  }

  getById(id: string): Territory | undefined {
    return this.load().find(
      (territory) => territory.id === id
    );
  }

  add(territory: Territory): void {
    const territories = this.load();

    territories.push(territory);

    this.save(territories);
  }

  update(updated: Territory): void {
    const territories = this.load().map((territory) =>
      territory.id === updated.id
        ? updated
        : territory
    );

    this.save(territories);
  }

  delete(id: string): void {
    const territories = this.load().filter(
      (territory) => territory.id !== id
    );

    this.save(territories);
  }
}

export const territoryService =
  new TerritoryService();