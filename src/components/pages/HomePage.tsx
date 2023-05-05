import { useDevDashboard } from "../../contexts/devDashboardContext";
import DogLottie from "../molecules/DogLottie";

import Page from "./Page";

const HomePage = () => {
  const { logs } = useDevDashboard();
  const handleClick = () => {
    logs.push("Clicked");
  };
  return (
    <Page title="Home Content">
      <div className="flex items-center justify-center h-full">
        <DogLottie />
        <button onClick={handleClick}>Click Me</button>
      </div>
    </Page>
  );
};
export default HomePage;
