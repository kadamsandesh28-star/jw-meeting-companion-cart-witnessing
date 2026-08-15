import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type Workspace = "personal" | "congregation";

interface WorkspaceContextType {
  workspace: Workspace;
  setWorkspace: (workspace: Workspace) => void;

  congregationUnlocked: boolean;
  unlockCongregation: () => void;
  lockCongregation: () => void;
}

const WorkspaceContext = createContext<
  WorkspaceContextType | undefined
>(undefined);

export function WorkspaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [workspace, setWorkspace] =
    useState<Workspace>("personal");

  const [congregationUnlocked, setCongregationUnlocked] =
    useState(false);

  const unlockCongregation = () => {
    setCongregationUnlocked(true);
    setWorkspace("congregation");
  };

  const lockCongregation = () => {
    setCongregationUnlocked(false);
    setWorkspace("personal");
  };

  const value = useMemo(
    () => ({
      workspace,
      setWorkspace,
      congregationUnlocked,
      unlockCongregation,
      lockCongregation,
    }),
    [workspace, congregationUnlocked]
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      "useWorkspace must be used inside WorkspaceProvider"
    );
  }

  return context;
}