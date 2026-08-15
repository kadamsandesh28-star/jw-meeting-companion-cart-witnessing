import {
  loadPublishers,
  loadGroups,
  loadDepartments,
  loadShepherding,
  getPublisherName,
} from "./congregationService";

import { SearchResult } from "../types/SearchResult";

export function globalSearch(query: string): SearchResult[] {
  const text = query.trim().toLowerCase();

  if (!text) return [];

  const results: SearchResult[] = [];

  /* ---------------- Publishers ---------------- */

  loadPublishers().forEach((publisher) => {
    const searchable = [
      publisher.firstName,
      publisher.lastName,
      `${publisher.firstName} ${publisher.lastName}`,
      publisher.phone,
      publisher.email,
      publisher.privileges,
      publisher.serviceGroup,
      publisher.notes,
    ]
      .join(" ")
      .toLowerCase();

    if (searchable.includes(text)) {
      results.push({
        id: publisher.id,
        title: `${publisher.firstName} ${publisher.lastName}`,
        subtitle: "Publisher",
        type: "publisher",
      });
    }
  });

  /* ---------------- Groups ---------------- */

  loadGroups().forEach((group) => {
    const searchable = group.name.toLowerCase();

    if (searchable.includes(text)) {
      results.push({
        id: group.id,
        title: group.name,
        subtitle: "Field Service Group",
        type: "group",
      });
    }
  });

  /* ---------------- Departments ---------------- */

  loadDepartments().forEach((department) => {
    const searchable = [
      department.name,
      department.notes,
    ]
      .join(" ")
      .toLowerCase();

    if (searchable.includes(text)) {
      results.push({
        id: department.id,
        title: department.name,
        subtitle: "Department",
        type: "department",
      });
    }
  });

  /* ---------------- Shepherding ---------------- */

  loadShepherding().forEach((record) => {
    const publisherName = getPublisherName(record.publisherId);

    const searchable = [
      publisherName,
      record.notes,
      record.lastVisit,
      record.nextVisit,
    ]
      .join(" ")
      .toLowerCase();

    if (searchable.includes(text)) {
      results.push({
        id: record.id,
        title: publisherName,
        subtitle: "Shepherding Record",
        type: "shepherding",
      });
    }
  });

  return results.sort((a, b) => a.title.localeCompare(b.title));
}