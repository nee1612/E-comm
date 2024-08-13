import React from "react";
import Lottie from "lottie-react";
import LoderLottie from "../assets/Lottie/loader.json";

function Loader() {
  return (
    <div className="flex h-[100vh] w-full justify-center ">
      <Lottie className="w-[20%]  " animationData={LoderLottie} />
    </div>
  );
}

export default Loader;
