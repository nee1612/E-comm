import React, { useState, useEffect } from "react";
import LoginPic from "../../assets/Rectangle 3463273.png";
import Logo from "./../../assets/image.png";
import "../../customToast.css";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import LoginLottie from "../../assets/Lottie/google.json";
import { auth } from "../../Config/firebase";
import {
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const HandleSingInWithGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const googleProvider = new GoogleAuthProvider();
      googleProvider.setCustomParameters({
        prompt: "select_account", // Forces the account selection screen
      });

      // Sign in with Google popup
      const res = await signInWithPopup(auth, googleProvider);
      const googleUser = res.user;
      const googleCredential = GoogleAuthProvider.credentialFromResult(res);
      const existingUserMethods = await fetchSignInMethodsForEmail(
        auth,
        googleUser.email
      );

      console.log(existingUserMethods, existingUserMethods.length);
      if (
        existingUserMethods.length &&
        existingUserMethods.includes("password")
      ) {
        console.log(existingUserMethods, existingUserMethods.length);
        try {
          // Attempt to link the Google account to the existing email/password account
          await linkWithCredential(auth.currentUser, googleCredential);
          console.log(
            "Google account successfully linked to existing email/password account."
          );
        } catch (linkError) {
          console.error(
            "Error linking Google account to email/password account:",
            linkError
          );
        }
      } else {
        console.log("User does not have an email/password account.");
      }

      setLoading(false);
      cookies.set("auth-token", res.user.refreshToken);
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
      toast.error("Error during login. Please try again.");
    }
  };

  useEffect(() => {
    const token = cookies.get("auth-token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const signIn = async (e) => {
    e.preventDefault();
    setLoadingGoogle(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      if (!user.emailVerified) {
        await auth.signOut();
        toast.error(
          "Your email is not verified. Please verify your email and try again."
        );
        return;
      }
      console.log("result", result.user.refreshToken);
      cookies.set("auth-token", result.user.refreshToken);
      toast.success("Login Success", {
        position: "top-center",
        className: "custom-toast-success",
        bodyClassName: "customToast",
      });
      setLoadingGoogle(false);
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
          <h2 className="text-2xl sm:text-3xl mb-3 font-semibold">Welcome</h2>
          <div className="mb-4 text-gray-400 flex gap-2">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-black font-semibold">
              Create Account
            </Link>
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
                className="w-full font-[900] px-3 py-[3px] text-[20px] border rounded-md focus:outline-none focus:ring-2"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="flex items-center"></label>
              </div>
              <div>
                <Link
                  to="/forget"
                  className=" cursor-pointer text-sm text-black font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              onClick={(e) => {
                signIn(e);
              }}
              type="button"
              className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 mb-4"
            >
              {loadingGoogle ? "Logging In..." : "Login"}
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
              className="w-full flex items-center justify-center px-4 border border-gray-300 text-gray-600 font-semibold rounded-md hover:bg-gray-50"
            >
              <span className="mr-2 w-12">
                <Lottie animationData={LoginLottie} loop={true} />
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
