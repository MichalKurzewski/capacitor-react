import animationData from "../../assets/lotties/loading.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRef } from "react";

const LoadingLottie = () => {
  const playerRef = useRef<Player>(null);

  return (
    <Player
      src={animationData}
      className="player"
      loop
      autoplay
      ref={playerRef}
    />
  );
};

export default LoadingLottie;
