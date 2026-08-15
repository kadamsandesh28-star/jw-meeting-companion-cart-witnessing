import { sampleServiceGroups } from "../data/sampleServiceGroups";
import { ServiceGroup } from "../types/serviceGroup";

const STORAGE_KEY = "jw-meeting-companion.service-groups";

class ServiceGroupService {
  private serviceGroups: ServiceGroup[];

  constructor() {
    this.serviceGroups = this.load();
  }

  private load(): ServiceGroup[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sampleServiceGroups)
      );

      return [...sampleServiceGroups];
    }

    try {
      return JSON.parse(stored) as ServiceGroup[];
    } catch {
      localStorage.removeItem(STORAGE_KEY);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sampleServiceGroups)
      );

      return [...sampleServiceGroups];
    }
  }

  private save() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(this.serviceGroups)
    );
  }

  getAll(): ServiceGroup[] {
    return [...this.serviceGroups];
  }

  getById(id: string): ServiceGroup | undefined {
    return this.serviceGroups.find(
      (group) => group.id === id
    );
  }

  add(group: ServiceGroup) {
    this.serviceGroups.push(group);
    this.save();
  }

  update(updated: ServiceGroup) {
    this.serviceGroups = this.serviceGroups.map((group) =>
      group.id === updated.id ? updated : group
    );

    this.save();
  }

  delete(id: string) {
    this.serviceGroups = this.serviceGroups.filter(
      (group) => group.id !== id
    );

    this.save();
  }

  reset() {
    this.serviceGroups = [...sampleServiceGroups];
    this.save();
  }
}

export const serviceGroupService = new ServiceGroupService();