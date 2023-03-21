import DogLottie from "../molecules/DogLottie";
import Page from "./Page";

const HomePage = () => (
  <Page title="Home Content">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <DogLottie />
    </div>
  </Page>
);

export default HomePage;
