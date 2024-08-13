import React, { useEffect } from "react";
import LoginPic from "../../assets/Rectangle 3463273.png";
import Logo from "./../../assets/image.png";
import "../../customToast.css";
import { useState } from "react";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import LoginLottie from "../../assets/Lottie/google.json";

import {
  auth,
  googleProvider,
  signInWithGoogleUser,
} from "../../Config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSingInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      cookies.set("auth-token", res.user.refreshToken);

      toast.success("Login Success ", {
        position: "top-center",
        className: "custom-toast-success",
        bodyClassName: "customToast",
      });
      navigate("/");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = cookies.get("auth-token");
    if (token) {
      navigate("/");
    }
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("result", result.user.refreshToken);
      cookies.set("auth-token", result.user.refreshToken);
      toast.success("Login Success ", {
        position: "top-center",
        className: "custom-toast-success",
        bodyClassName: "customToast",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message, {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <section className="w-1/2 flex items-center justify-center bg-gray-50 relative">
        <img
          className="w-full h-auto max-w-full max-h-screen object-cover"
          src={LoginPic}
          alt="Fashion Model"
        />
        <img src={Logo} className="absolute top-10 left-10 w-28" alt="" />
      </section>

      <section className="w-1/2 flex items-center justify-center bg-white font-raleway">
        <div className="max-w-md w-full p-8">
          <h2 className="text-3xl  mb-3  font-semibold ">Welcome </h2>
          <p className="mb-4  font-raleway text-gray-400">Please login here</p>

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
                className="w-full px-3 py-2 text-sm font-medium   border rounded-md focus:outline-none focus:ring-2 "
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 "
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 font-semibold text-sm">
                    Remember Me
                  </span>
                </label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-sm text-black font-semibold hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              onClick={(e) => {
                signIn(e);
              }}
              type="button"
              className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 mb-4"
            >
              Login
            </button>
            <div className="flex items-center my-3 mb-4">
              <hr className="flex-grow border-gray-400" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="flex-grow border-gray-400" />
            </div>
            <button
              type="button"
              onClick={(e) => {
                HandleSingInWithGoogle(e);
              }}
              className="w-full  overflow-hidden px-4 border border-gray-300 text-gray-600 font-semibold rounded-md hover:bg-gray-50 flex items-center justify-center"
            >
              <span className="mr-2  w-[3rem]">
                <Lottie
                  className="lottieGoogle"
                  animationData={LoginLottie}
                  loop={true}
                />
              </span>
              Sign in with Google
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
