import GameLottie from "../molecules/GameLottie";
import Page from "./Page";

const GamePage = () => (
  <Page title="Game">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <GameLottie />
    </div>
  </Page>
);

export default GamePage;
