import React from "react";
import { useEffect, useRef } from "react";
import backgrounImg3 from "../assets/bgg.png";

function HomeComp({ scrollToProductGrid, loading }) {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Trigger animations when the component mounts
    if (textRef.current && imageRef.current) {
      textRef.current.classList.add("animate-fadeInFromRight");
      imageRef.current.classList.add("animate-fadeInFromLeft");
    }
  }, [loading]);
  return (
    <div className="flex flex-col items-center   bg-gray-200 overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto  py-8">
        {/* Background Section */}
        <div className="relative w-full mb-8 ">
          <div className="absolute inset-0  md:-inset-10 md:left-4 md:-bottom-10  bg-cover bg-center ">
            <h1
              className="pseudoText  text-[5rem] md:text-[8rem] lg:text-[13rem] font-extrabold text-[#eff0f3]
             absolute bottom-8 left-8 md:bottom-14 md:left-32 animate-slideInFromTop"
            >
              BESTSELLER
            </h1>
            <h1 className="pseudoText2 slideInFromBottom text-[5rem] md:text-[8rem] lg:text-[13rem] font-extrabold text-gray-50 opacity-50 absolute bottom-8 left-8 md:bottom-20 md:left-32">
              FASHION
            </h1>
          </div>

          {/* Content Section */}
          <div className="relative z-10 flex flex-col-reverse md:flex-row md:justify-between font-raleway">
            {/* Text Content */}
            <div
              ref={textRef}
              className="w-full md:w-[65%] space-y-4 mt-8 md:mt-28 md:pl-10 text-center md:text-left opacity-1"
            >
              <h2 className="text-2xl text-gray-500">Classic Exclusive</h2>
              <h1 className="text-3xl md:text-4xl font-bold text-black">
                Fashion Collection
              </h1>
              <p className="text-sm text-gray-500">UPTO 50% OFF</p>
              <p
                onClick={scrollToProductGrid}
                className="cursor-pointer inline-block bg-black text-white py-2 px-4 rounded-md mt-4 hover:bg-gray-800"
              >
                Shop Now &rarr;
              </p>
            </div>

            {/* Image and Frame */}
            <div
              ref={imageRef}
              className="homeBg relative w-full md:w-[50%] mt-8 md:mt-0 opacity-1"
            >
              <img
                src="https://res.cloudinary.com/codemingle/image/upload/v1723848777/bgg1_eycsgb.png"
                // src={backgrounImg3}
                alt="https://res.cloudinary.com/codemingle/image/upload/v1723848777/bgg1_eycsgb.png"
                className="object-cover w-full h-auto"
              />
              <div className="pseuElemFrame absolute top-4 right-[4.5rem] p-2 border-gray-400 opacity-60 border-[8px] transform rotate-6 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComp;
