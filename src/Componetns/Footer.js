import React from "react";
import { useState } from "react";
import Logo from "./../assets/image.png"; // Update the path to your logo
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    const templateParams = {
      user_email: email,
    };

    emailjs
      .send(
        "service_9zo2tlv",
        "template_7msteqi",
        templateParams,
        "U48J8PfQwkYnnO9yE"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Subscription successful", {
            position: "top-center",
            className: "custom-toast-success",
            bodyClassName: "customToast",
            autoClose: 3000,
          });
          setEmail("");
          window.scrollTo(0, 0);
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Subscription failed. Please try again.");
        }
      );
  };
  return (
    <footer className="bg-black text-white py-8">
      <div className="container  sm:mx-auto px-6 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Logo and Contact Info */}
          <div className="-mb-5 sm:mb-8 md:mb-0 md:w-1/3 md:ml-4">
            <img
              src={Logo}
              className="w-32 bg-blend-multiply filter invert mb-4"
              alt="Logo"
            />
            <p className="text-gray-400 mb-2 space-y-1">
              <span className="flex gap-2 align-middle items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-phone"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <p className="mb-1">(704) 555-0127</p>
              </span>
              <span
                className="flex items-center align-middle
              gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-mail"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <p className="mb-1">krist@example.com</p>
              </span>
              <span className="flex  align-middle items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-map-pin"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="-mb-1">
                  3891 Ranchview Dr. Richardson, California
                </p>
              </span>
            </p>
          </div>

          {/* Information */}
          <div className="-mb-5 sm:mb-8 md:mb-0 md:w-1/3">
            <h3 className="font-semibold mb-1 sm:mb-4">Information</h3>
            <ul>
              <li className=" sm:mb-2">
                <a href="/profile" className="text-gray-400 hover:text-white">
                  My Account
                </a>
              </li>
              <li className="sm:mb-2">
                <a href="/login" className="text-gray-400 hover:text-white">
                  Login
                </a>
              </li>
              <li className="sm:mb-2">
                <a href="/cart" className="text-gray-400 hover:text-white">
                  My Cart
                </a>
              </li>
              <li className="sm:mb-2">
                <a href="/wishlist" className="text-gray-400 hover:text-white">
                  My Wishlist
                </a>
              </li>
            </ul>
          </div>

          {/* Service */}
          <div className="-mb-5 sm:mb-8 md:mb-0 md:w-1/3">
            <h3 className="font-semibold mb-1  sm:mb-4">Service</h3>
            <ul>
              <li className="sm:mb-2">
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li className="sm:mb-2">
                <a href="/" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li className="sm:mb-2">
                <a href="/" className="text-gray-400 hover:text-white">
                  Delivery Information
                </a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="md:w-1/3">
            <h3 className="font-semibold mb-1 sm:mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Enter your email below to be the first to know about new
              collections and product launches.
            </p>
            <form className="flex items-center border-[2px] border-gray-500 rounded-full overflow-hidden">
              <span className="p-3 bg-transparent text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 bg-transparent  flex-grow text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="click"
                onClick={(e) => handleSubscribe(e)}
                className="p-3 bg-transparent text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
