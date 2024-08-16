import React from "react";

const AboutUs = () => {
  return (
    <div className="relative bg-white text-black min-h-screen">
      {/* Top Section */}
      <section className="relative flex flex-col items-center text-center py-16 px-4">
        <div className="absolute inset-0 transform rotate-0 overflow-hidden">
          <div className="absolute top-10 left-0 text-8xl font-bold text-gray-100 opacity-20">
            fashion
          </div>
        </div>
        <div className="z-10">
          <h1 className="text-5xl md:text-7xl font-bold">
            Discover the best{" "}
            <span className="text-yellow-400">fashion trends</span>
          </h1>
          <button className="mt-8 bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition duration-300">
            VIEW ALL COLLECTION
          </button>
          <div className="absolute top-6 right-4 transform rotate-0 text-right text-sm font-medium">
            <p>NEW ARRIVALS</p>
            <p>FORMAL COLLECTION</p>
          </div>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="relative">
          <img
            src="/path-to-your-image-1.jpg"
            alt="Fashion 1"
            className="w-full h-auto rounded-md"
          />
          <div className="absolute top-4 left-4 transform -rotate-12 text-black text-sm font-medium">
            Our Luxury Fashion
          </div>
          <p className="absolute bottom-4 left-4 text-gray-600 bg-white bg-opacity-75 p-2 rounded">
            Portraits often seem pregnant with speech...
          </p>
        </div>
        <div className="relative">
          <img
            src="/path-to-your-image-2.jpg"
            alt="Fashion 2"
            className="w-full h-auto rounded-md"
          />
          <p className="mt-4 text-gray-600">
            Portraits often seem pregnant with speech, or as if their subjects
            have just finished...
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
