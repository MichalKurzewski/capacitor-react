import animationData from "../../assets/lotties/game-boost.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRef } from "react";

const GameLottie = () => {
  const playerRef = useRef<Player>(null);

  return (
    <div className="h-full w-full">
      <Player
        src={animationData}
        className="player"
        loop
        autoplay
        ref={playerRef}
      />
    </div>
  );
};

export default GameLottie;
