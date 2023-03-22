import animationData from "../../assets/lotties/dog.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRef } from "react";

const DogLottie = () => {
  const playerRef = useRef<Player>(null);
  const handleClickLottie = () => {
    playerRef.current?.play();
    playerRef.current?.setLoop(false);
  };
  return (
    <div
      className="cursor-pointer"
      onClick={handleClickLottie}
      onMouseLeave={() => playerRef.current?.setLoop(false)}
    >
      <div>
        <Player src={animationData} className="player" loop ref={playerRef} />
      </div>
    </div>
  );
};

export default DogLottie;
