import React from "react";
import { FaInstagram, FaShoppingBag } from "react-icons/fa";
import user1 from "../assets/Rectangle 3463272.png";
import user2 from "../assets/Rectangle 3463273.png";
import user3 from "../assets/bgg.png";
import user4 from "../assets/$RPSISKI.jpg";

const InstagramStories = ({ pageType }) => {
  const images = [
    {
      src: user1,
      alt: "Image 1",
    },
    {
      src: user2,
      alt: "Image 2",
    },
    {
      src: user3,
      alt: "Image 3",
    },
    {
      src: user4,
      alt: "Image 4",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-raleway">
      {pageType === "home" && (
        <h2 className="text-center text-3xl font-semibold mb-8">
          Our Instagram Stories
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[20rem] object-top object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {pageType === "home" ? (
                <FaInstagram className="text-white text-4xl" />
              ) : (
                <FaShoppingBag className="text-white text-4xl" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-6">
        <div className="flex flex-col items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-truck"
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
          </svg>
          <div className="text-xl font-semibold mt-2">Free Shipping</div>
          <div className="text-gray-500 text-sm">
            Free shipping for orders above $150
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-dollar-sign"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
            <path d="M12 18V6" />
          </svg>
          <div className="text-xl font-semibold mt-2">Money Guarantee</div>
          <div className="text-gray-500 text-sm">
            Within 30 days for an exchange
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-headset"
          >
            <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
            <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
          </svg>
          <div className="text-xl font-semibold mt-2">Online Support</div>
          <div className="text-gray-500 text-sm">
            24 hours a day, 7 days a week
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-wallet-minimal"
          >
            <path d="M17 14h.01" />
            <path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" />
          </svg>
          <div className="text-xl font-semibold mt-2">Flexible Payment</div>
          <div className="text-gray-500 text-sm">
            Pay with multiple credit cards
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramStories;
