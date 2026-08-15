import { ServiceCommittee } from "../types/ServiceCommittee";

const STORAGE_KEY = "jwmc-service-committee";

function load(): ServiceCommittee[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as ServiceCommittee[];
  } catch {
    return [];
  }
}

function save(serviceCommittees: ServiceCommittee[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(serviceCommittees)
  );
}

let serviceCommittees = load();

export const serviceCommitteeService = {
  getAll(): ServiceCommittee[] {
    return [...serviceCommittees];
  },

  getById(id: string): ServiceCommittee | undefined {
    return serviceCommittees.find(
      (committee) => committee.id === id
    );
  },

  add(serviceCommittee: ServiceCommittee): void {
    serviceCommittees.push(serviceCommittee);
    save(serviceCommittees);
  },

  update(serviceCommittee: ServiceCommittee): void {
    serviceCommittees = serviceCommittees.map((committee) =>
      committee.id === serviceCommittee.id
        ? serviceCommittee
        : committee
    );

    save(serviceCommittees);
  },

  delete(id: string): void {
    serviceCommittees = serviceCommittees.filter(
      (committee) => committee.id !== id
    );

    save(serviceCommittees);
  },
};