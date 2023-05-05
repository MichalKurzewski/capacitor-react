// DevDashboard.tsx
import React, { useState } from "react";
import { useDevDashboard } from "../../contexts/devDashboardContext";


const DevDashboard: React.FC = () => {
  const [isDashboardVisible, setDashboardVisible] = useState(false);
  const { logs, toggleVariable } = useDevDashboard();

  return (
    <div>
      <button className="btn fixed bottom-20 right-4 z-30"
        onClick={() => setDashboardVisible(!isDashboardVisible)}
      >
        Toggle Dev Dashboard
      </button>
      {isDashboardVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 20,
            overflowY: "auto",
          }}
        >
          <pre className="text-slate-300">{JSON.stringify(logs, null, 2)}</pre>
          <button className="text-slate-300" onClick={() => toggleVariable("sampleVariable")}>
            Toggle Sample Variable
          </button>
        </div>
      )}
    </div>
  );
};

export default DevDashboard;
