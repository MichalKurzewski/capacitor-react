// DevDashboard.tsx
import React, { useState } from "react";
import { useDevDashboard } from "../../contexts/devDashboardContext";

const DevDashboard: React.FC = () => {
  const [isDashboardVisible, setDashboardVisible] = useState(false);
  const { logs, toggleVariable } = useDevDashboard();

  return (
    <div>
      <button
        className="btn fixed bottom-20 right-4 z-30 translate-x-full hover:translate-x-0 hover:duration-300"
        onClick={() => setDashboardVisible(!isDashboardVisible)}
      >
        Toggle Dev Dashboard
      </button>
      {isDashboardVisible && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-20 overflow-y-auto">
          <pre className="text-slate-300">{JSON.stringify(logs, null, 2)}</pre>
          <button
            className="text-slate-300"
            onClick={() => toggleVariable("sampleVariable")}
          >
            Toggle Sample Variable
          </button>
        </div>
      )}
    </div>
  );
};

export default DevDashboard;
