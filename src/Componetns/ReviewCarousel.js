import React, { useState, useEffect, useCallback } from "react";
import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import user4 from "../assets/user4.jpg";
import user5 from "../assets/user5.jpg";
import user6 from "../assets/user6.jpg";
import user7 from "../assets/user7.jpg";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const reviews = [
  {
    name: "Leslie Alexander",
    role: "Model",
    image: user1,
    rating: 3,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Jacob Jones",
    role: "Co-Founder",
    image: user2,
    rating: 4,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Jenny Wilson",
    role: "Fashion Designer",
    image: user3,
    rating: 3,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Mike Johnson",
    role: "Software Engineer",
    image: user4,
    rating: 5,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Sarah Lee",
    role: "Graphic Designer",
    image: user5,
    rating: 4,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Paul Walker",
    role: "Marketing Head",
    image: user6,
    rating: 3,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Emily Davis",
    role: "Data Scientist",
    image: user7,
    rating: 3,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Alen Walker",
    role: "Marketing Head",
    image: user6,
    rating: 4,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Emily",
    role: "Data Scientist",
    image: user7,
    rating: 5,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(reviews.length / 3) - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(reviews.length / 3) - 1 : prevIndex - 1
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [nextSlide]);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => {
          if (rating >= index + 1) {
            return <FaStar key={index} className="text-yellow-500" />;
          } else if (rating >= index + 0.5) {
            return <FaStarHalfAlt key={index} className="text-yellow-500" />;
          } else {
            return <FaStar key={index} className="text-gray-300" />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-raleway">
      <div className="flex flex-col md:flex-row items-center align-middle justify-between px-3">
        <h2 className="text-center text-2xl md:text-3xl font-semibold ">
          What our Customers Say
        </h2>
        <div className="flex justify-center sm:mb-2 md:justify-end mt-4 space-x-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 md:w-10 md:h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 will-change-transform"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 p-4"
              >
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    {review.review}
                  </p>
                  <div className="flex items-center justify-center">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-2"
                    />
                    <div>
                      <h3 className="font-bold text-sm md:text-base">
                        {review.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
