import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import yourImage from "../assets/daniel-monteiro-VMeHP3mNJL4-unsplash.jpg"; // Make sure to update the image path

const DealsOfTheMonth = ({ scrollToProductGrid }) => {
  const calculateTimeLeft = () => {
    let difference = +new Date("2024-09-30") - +new Date(); // Set your end date here
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16 rounded-lg shadow-lg font-raleway">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold mb-4 pl-4">Deals of the Month</h2>
        <p className="text-gray-600 mb-6 pl-4">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters.
        </p>
        <div className="flex space-x-4 pl-4 font-radio-canada">
          <div className="text-center border-2 px-4 py-2 rounded-md">
            <div className="text-2xl font-bold">{timeLeft.days || "0"}</div>
            <div className="text-sm text-gray-500">Days</div>
          </div>
          <div className="text-center border-2 px-4 py-2 rounded-md">
            <div className="text-2xl font-bold">{timeLeft.hours || "0"}</div>
            <div className="text-sm text-gray-500">Hours</div>
          </div>
          <div className="text-center border-2 px-4 py-2 rounded-md">
            <div className="text-2xl font-bold">{timeLeft.minutes || "0"}</div>
            <div className="text-sm text-gray-500">Mins</div>
          </div>
          <div className="text-center border-2 px-4 py-2 rounded-md">
            <div className="text-2xl font-bold">{timeLeft.seconds || "0"}</div>
            <div className="text-sm text-gray-500">Secs</div>
          </div>
        </div>
        <p
          onClick={scrollToProductGrid}
          className="cursor-pointer ml-4 mt-6 inline-block bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          View All Products →
        </p>
      </div>
      <div className="md:w-[40%]">
        <img
          src={yourImage}
          alt="Deals of the Month"
          className="w-auto h-[35rem] rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default DealsOfTheMonth;
