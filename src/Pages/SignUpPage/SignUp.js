import { useEffect, useState } from "react";
import React from "react";
import SignInPc from "../../assets/Rectangle 3463272.png";
import Logo from "./../../assets/image.png";
import {
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, OTPCred, userCred } from "../../Config/firebase";
import { useNavigate, Link } from "react-router-dom";
import { generateOTP } from "otp-agent";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const authRef = collection(OTPCred, "OTPCred");
  const userCredRef = collection(userCred, "userCred");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Check for empty input fields
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!isTermsChecked) {
      toast.error("You must agree to the Terms & Conditions");
      setLoading(false);
      return;
    }

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        if (signInMethods.includes("google.com")) {
          toast.error("Email is already associated with a Google account.");
        } else {
          toast.error("Email already exists.");
        }
        setLoading(false);
        setEmail("");
        setFullName("");
        setPassword("");
        setConfirmPassword("");
        setIsTermsChecked(false);
        return;
      }
      const q = query(authRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error("Email is already exist.");
        setLoading(false);
        setEmail("");
        setFullName("");
        setPassword("");
        setConfirmPassword("");
        setIsTermsChecked(false);
        return;
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await updateProfile(user, { displayName: fullName });
      await sendEmailVerification(user);
      toast.success(
        "Account created! Please verify your email before logging in."
      );
      await addDoc(userCredRef, {
        username: fullName,
        email: email,
        password: password,
        userId: user.uid,
      });
      setEmail("");
      setFullName("");
      setPassword("");
      setConfirmPassword("");
      setIsTermsChecked(false);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const token = cookies.get("auth-token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col lg:flex-row">
      <section className="lg:w-1/2 w-full h flex items-center justify-center bg-gray-50 relative">
        <img
          className="w-full h-auto lg:h-[100vh] object-cover"
          src={SignInPc}
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

      <section className="mb-20 sm:mb-0 mt-6 lg:mx-0 sm:mt-0  lg:w-1/2 w-[90%] mx-auto  flex items-center justify-center bg-white font-raleway p-4 sm:p-6 lg:p-8">
        <div className="max-w-[40rem] w-full">
          <h2 className="text-2xl md:text-3xl mb-3 font-semibold">
            {" "}
            Create New Account
          </h2>
          <div className="mb-4 text-gray-400 flex gap-2">
            <p>Already have an account? </p>
            <Link to="/login" className="text-black font-semibold">
              Login
            </Link>
          </div>

          <form onSubmit={signIn}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="fullName"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2"
              />
            </div>
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
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full font-[900] px-3 py-[3px] text-[20px] border rounded-md focus:outline-none focus:ring-2"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isTermsChecked}
                  onChange={(e) => setIsTermsChecked(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 font-semibold text-sm">
                  I agree to the{" "}
                  <span className="font-bold">Terms & Conditions</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            {/* {loading ? (
            ) : (
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800"
              >
                Sign Up
              </button>
            )} */}
          </form>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
