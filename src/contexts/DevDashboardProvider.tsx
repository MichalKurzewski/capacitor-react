// DevDashboardProvider.tsx
import React, { useState, useCallback } from "react";
import DevDashboardContext from "./devDashboardContext";

interface DevDashboardProviderProps {
  children: React.ReactNode;
}

const DevDashboardProvider: React.FC<DevDashboardProviderProps> = ({
  children,
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [variables, setVariables] = useState<Record<string, boolean>>({});

  const addLog = useCallback((log: string) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  }, []);

  const toggleVariable = useCallback((variableName: string) => {
    setVariables((prevVariables) => ({
      ...prevVariables,
      [variableName]: !prevVariables[variableName],
    }));
  }, []);

  return (
    <DevDashboardContext.Provider value={{ logs, addLog, toggleVariable }}>
      {children}
    </DevDashboardContext.Provider>
  );
};

export default DevDashboardProvider;
