import React, { useState, useEffect } from "react";
import LoginPic from "../../assets/Rectangle 3463273.jpg";
import Logo from "./../../assets/image.png";
import "../../customToast.css";
import { toast } from "react-toastify";
import { auth } from "../../Config/firebase";
import {
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { IoIosArrowBack } from "react-icons/io";
const cookies = new Cookies();

function ForgetPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSendForgetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      const fetchSignInMethod = await fetchSignInMethodsForEmail(auth, email);
      console.log(fetchSignInMethod);
      if (fetchSignInMethod.length === 0) {
        toast.error("Email not found");
        return;
      }
      toast.success("Reset password link sent to your email");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const token = cookies.get("auth-token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row ">
      {/* Left Section */}
      <section className="lg:w-1/2 w-full h flex items-center justify-center bg-gray-50 relative">
        <img
          className="w-full h-auto lg:h-[100vh] object-cover"
          src={LoginPic}
          alt="Fashion Model"
        />
        <img
          src={Logo}
          className="absolute top-10 left-10 w-24 sm:w-28"
          onClick={() => {
            navigate("/");
          }}
          alt=""
        />
      </section>

      {/* Right Section */}
      <section className="mb-20 sm:mb-0 mt-6 lg:mx-0 sm:mt-0  lg:w-1/2 w-[90%] mx-auto  flex items-center justify-center bg-white font-raleway p-4 sm:p-6 lg:p-8">
        <div className="max-w-[40rem] w-full">
          <div
            className="flex items-center gap-2 mb-3 font-raleway text-lg"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoIosArrowBack size={25} className=" cursor-pointer" />
            <p className="cursor-pointer">Back</p>
          </div>
          <h2 className="text-2xl sm:text-3xl mb-3 font-semibold">
            Forgot Password
          </h2>
          <div className="mb-4 text-gray-400 mr-3 ">
            <p>
              Enter you registered email address. We'll send you link to reset
              password.
            </p>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2"
              />
            </div>

            <button
              onClick={(e) => {
                handleSendForgetPassword(e);
              }}
              type="button"
              className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 mb-4"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ForgetPage;
