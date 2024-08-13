import React from "react";

import backgrounImg2 from "../assets/bgg.png";

function HomeComp() {
  return (
    <div className="flex   justify-center min-h-screen bg-gray-50">
      <div className="relative w-full max-w-6xl mx-auto px-8 py-1">
        <div className="absolute inset-0  bg-cover bg-center overflow-hidden ">
          <h1 className="text-[13rem] font-extrabold text-gray-200 absolute bottom-20 left-32">
            BESTSELLER
          </h1>
        </div>

        <div className="relative z-10 flex justify-between  font-raleway ">
          <div className="w-[60%]  space-y-4 mt-20 pl-[3rem]">
            <h2 className="text-2xl text-gray-500">Classic Exclusive</h2>
            <h1 className="text-4xl font-bold text-black">
              Women's Collection
            </h1>
            <p className="text-sm text-gray-500">UPTO 40% OFF</p>
            <a
              href="#"
              className="inline-block bg-black text-white py-2 px-4 rounded-md mt-4 hover:bg-gray-800"
            >
              Shop Now &rarr;
            </a>
          </div>

          <div className="relative w-full max-w-[50%]">
            <img
              src={backgrounImg2}
              alt="Women's Collection"
              className="object-cover w-full h-auto "
            />
            <div
              className="absolute -z-10 top-[1.6rem] right-[6.3rem] p-4 border-gray-400 border-[10px] transform rotate-6  pointer-events-none"
              style={{
                width: "calc(100% - 12rem)",
                height: "calc(100% - 4rem)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComp;
