import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const reviews = [
  {
    name: "Leslie Alexander",
    role: "Model",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726346684/carousel/user1_x6wsb9.jpg",
    rating: 3,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Jacob Jones",
    role: "Co-Founder",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726346685/carousel/user2_yfdgri.jpg",
    rating: 4,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Jenny Wilson",
    role: "Fashion Designer",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726346688/carousel/user3_y435a0.jpg",
    rating: 3,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Mike Johnson",
    role: "Software Engineer",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726346687/carousel/user4_zbhfh7.jpg",
    rating: 5,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Sarah Lee",
    role: "Graphic Designer",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726346687/carousel/user5_b6vjbv.jpg",
    rating: 4,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Paul Walker",
    role: "Marketing Head",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726346687/carousel/user6_z0r7wp.jpg",
    rating: 3,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Emily Davis",
    role: "Data Scientist",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726346685/carousel/user7_bdyo2b.jpg",
    rating: 3,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Alen Walker",
    role: "Marketing Head",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726347081/carousel/Rectangle_3463272_fisyxn.png",
    rating: 4,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
  {
    name: "Emily",
    role: "Data Scientist",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726347081/carousel/western_buplmr.jpg",
    rating: 5,
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.",
  },
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        <h2 className="text-center text-2xl md:text-3xl font-semibold  mb-4">
          What our Customers Say
        </h2>
      </div>
      <div className="relative">
        <div className="overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={"auto"}
            autoplay={{ delay: 3000 }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            breakpoints={{
              640: {
                slidesPerView: 1, // For screens smaller than 640px (e.g., mobile)
              },
              768: {
                slidesPerView: 2, // For screens larger than 640px but smaller than 768px
              },
              1024: {
                slidesPerView: 3, // For screens larger than 1024px
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div key={index} className="w-full  flex-shrink-0 p-4">
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg  text-center">
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
