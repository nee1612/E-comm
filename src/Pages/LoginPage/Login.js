import React from "react";
import LoginPic from "../../assets/Rectangle 3463273.png";
import Logo from "./../../assets/image.png";

function LoginPage() {
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
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold  rounded-md hover:bg-gray-800"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
