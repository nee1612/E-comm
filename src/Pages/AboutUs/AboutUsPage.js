import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import Nav from "../../Componetns/Navbar";

const AboutUs = () => {
  return (
    <>
      <Nav />
      <div className="bg-black my-auto h-[100vh] flex align-middle items-center justify-center">
        <section className="bg-black text-white py-10  px-4 sm:px-8 lg:px-16 overflow">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">About Us</h2>
            <p className="text-base sm:text-lg mb-6">
              Welcome to Krist, where fashion meets innovation. Our mission is
              to redefine style with a perfect blend of classic elegance and
              contemporary trends. From statement pieces to everyday essentials,
              we create designs that help you express your individuality.
            </p>
            <p className="text-base sm:text-lg mb-6">
              Established in [Year], we have evolved into a leading name in the
              fashion industry, driven by a passion for quality and an eye for
              detail. Our team is dedicated to sourcing premium materials and
              delivering timeless pieces that stand out.
            </p>
            <p className="text-base sm:text-lg mb-8">
              Join us on our journey and be part of a community that celebrates
              fashion in all its forms. Explore our collections and discover how
              our designs can transform your wardrobe.
            </p>
            <div className="flex justify-center space-x-6 sm:space-x-8 md:space-x-10 lg:space-x-12 mb-8">
              <a
                href="https://www.instagram.com"
                className="text-white hover:text-gray-400"
                aria-label="Instagram"
              >
                <FaInstagram className="text-2xl sm:text-3xl" />
              </a>
              <a
                href="https://www.facebook.com"
                className="text-white hover:text-gray-400"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-2xl sm:text-3xl" />
              </a>
              <a
                href="https://www.twitter.com"
                className="text-white hover:text-gray-400"
                aria-label="Twitter"
              >
                <FaTwitter className="text-2xl sm:text-3xl" />
              </a>
            </div>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-xs sm:text-sm">
                © 2024 Krist. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
