import React, { useState } from "react";
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
    rating: 3.5,
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
    rating: 2,
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
    rating: 5,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Alen Walker",
    role: "Marketing Head",
    image: user6,
    rating: 3,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Emily ",
    role: "Data Scientist",
    image: user7,
    rating: 5,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(reviews.length / 3) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(reviews.length / 3) - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => {
          if (rating >= index + 1) {
            return <FaStar key={index} className="text-yellow-500" />;
          } else if (rating >= index + 0.5) {
            return <FaStarHalfAlt key={index} className="text-yellow-500 " />;
          } else {
            return <FaStar key={index} className="text-gray-300" />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-raleway">
      <div className="flex align-middle items-baseline justify-between px-3">
        <h2 className="text-center text-3xl font-semibold mb-6">
          What our Customer say's
        </h2>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
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
            className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
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
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div key={index} className="w-1/3 flex-shrink-0 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-600 mb-4">{review.review}</p>
                  <div className="flex items-center justify-center">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover mr-2"
                    />
                    <div>
                      <h3 className="font-bold">{review.name}</h3>
                      <p className="text-sm text-gray-500">{review.role}</p>
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
