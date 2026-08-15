    import {
  loadPublishers,
  loadGroups,
  loadDepartments,
  loadShepherding,
} from "./congregationService";

export interface CongregationDashboardSummary {
  publishers: number;
  groups: number;
  departments: number;
  shepherdingRecords: number;
}

export function getCongregationDashboardSummary(): CongregationDashboardSummary {
  return {
    publishers: loadPublishers().length,
    groups: loadGroups().length,
    departments: loadDepartments().length,
    shepherdingRecords: loadShepherding().length,
  };
}