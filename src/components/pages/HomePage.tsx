import DogLottie from "../molecules/DogLottie";

import Page from "./Page";

const HomePage = () => {
  return (
    <Page title="Home Content">
      <div className="flex items-center justify-center h-full">
        <DogLottie />
      </div>
    </Page>
  );
};
export default HomePage;
