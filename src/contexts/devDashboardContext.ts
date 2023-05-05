import { createContext, useContext } from "react";

interface DevDashboardContextData {
  logs: string[];
  addLog: (log: string) => void;
  toggleVariable: (variableName: string) => void;
}

const DevDashboardContext = createContext<DevDashboardContextData>({
  logs: [],
  addLog: () => {},
  toggleVariable: () => {},
});

export const useDevDashboard = () => useContext(DevDashboardContext);

export default DevDashboardContext;
