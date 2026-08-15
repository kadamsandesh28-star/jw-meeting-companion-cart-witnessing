import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { authService } from "../security/authService";

interface ElderAuthContextType {
  unlocked: boolean;
  unlock: () => void;
  lock: () => void;
}

const ElderAuthContext = createContext<ElderAuthContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export function ElderAuthProvider({ children }: Props) {
  const [unlocked, setUnlocked] = useState(authService.isUnlocked());

  const value = useMemo(
    () => ({
      unlocked,

      unlock() {
        setUnlocked(true);
      },

      lock() {
        authService.lock();
        setUnlocked(false);
      },
    }),
    [unlocked]
  );

  return (
    <ElderAuthContext.Provider value={value}>
      {children}
    </ElderAuthContext.Provider>
  );
}

export function useElderAuth() {
  const context = useContext(ElderAuthContext);

  if (!context) {
    throw new Error(
      "useElderAuth must be used inside ElderAuthProvider."
    );
  }

  return context;
}