import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import {
  loadPlanner,
  updatePlannerStatus,
  PlannerAssignment,
  PlannerStatus,
} from "../services/plannerService";

interface PlannerContextType {
  planner: PlannerAssignment[];
  refreshPlanner: () => void;
  changeStatus: (
    id: string,
    status: PlannerStatus
  ) => void;
}

const PlannerContext =
  createContext<PlannerContextType | null>(
    null
  );

export function PlannerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [planner, setPlanner] = useState(
    loadPlanner()
  );

  function refreshPlanner() {
    setPlanner(loadPlanner());
  }

  function changeStatus(
    id: string,
    status: PlannerStatus
  ) {
    updatePlannerStatus(id, status);
    refreshPlanner();
  }

  return (
    <PlannerContext.Provider
      value={{
        planner,
        refreshPlanner,
        changeStatus,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context =
    useContext(PlannerContext);

  if (!context) {
    throw new Error(
      "usePlanner must be used inside PlannerProvider."
    );
  }

  return context;
}