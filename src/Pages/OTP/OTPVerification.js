import React, { useState, useRef } from "react";
import LoginPic from "../../assets/Rectangle 3463273.jpg";
import Logo from "./../../assets/image.png";
import { toast } from "react-toastify";
import { auth, OTPCred, userCred } from "../../Config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  // updateProfile,
  doc,
} from "firebase/firestore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { IoIosArrowBack } from "react-icons/io";

const cookies = new Cookies();

function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailId = location.state?.email;
  const navigatedEmail = searchParams.get("email");
  const urlEmail = emailId || navigatedEmail;
  const authRef = collection(OTPCred, "OTPCred");
  const authRefSec = collection(userCred, "userCred");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (otp[index] === "") {
        if (index > 0) {
          setOtp([...otp.map((d, idx) => (idx === index - 1 ? "" : d))]);
          inputRefs.current[index - 1].focus();
        }
      } else {
        // Clear the current field
        setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    let pasteData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pasteData.length > 6) {
      pasteData = pasteData.substring(0, 6);
    }
    setOtp([...pasteData.padEnd(6, " ")]);
    const focusIndex = pasteData.length > 0 ? pasteData.length - 1 : 0;
    inputRefs.current[focusIndex].focus();
  };

  const handleVerifyAndCreateUser = async () => {
    const enteredOtp = otp.join(""); // Join the OTP array into a string

    try {
      // Step 1: Verify OTP and Fetch Email & Password
      const q = query(
        authRef,
        where("OTP", "==", enteredOtp),
        where("email", "==", urlEmail)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If OTP is verified
        querySnapshot.forEach(async (docSnapshot) => {
          const docData = docSnapshot.data();
          const userEmail = docData.email; // Get email from the document
          const password = docData.password; // Get password from the document
          const fullName = docData.username; // Assuming you have username stored

          // Step 2: Create User with Email and Password
          try {
            const res = await createUserWithEmailAndPassword(
              auth,
              userEmail,
              password
            );
            const user = res.user;
            cookies.set("auth-token", user.refreshToken);

            // Update user's profile with the full name
            await updateProfile(user, {
              emailVerified: true,
              displayName: fullName,
            });

            // Step 3: Save User Data in 'userCred' Collection
            await addDoc(authRefSec, {
              username: fullName,
              email: userEmail,
              password: password,
              userId: user.uid,
            });

            // Step 4: Remove OTP from 'OTPCred' Collection
            await deleteDoc(doc(authRef, docSnapshot.id));

            // Navigate to home and show success message
            navigate("/");
            toast.success("Account Created Successfully", {
              position: "top-center",
              className: "custom-toast-success",
              bodyClassName: "customToast",
            });
          } catch (err) {
            console.error("Error creating user: ", err);
            toast.error(err.message, {
              position: "top-center",
              className: "custom-toast-error",
              bodyClassName: "customToast",
            });
          }
        });
      } else {
        console.log("OTP and email verification failed.");
        toast.error("Invalid OTP or Email", {
          position: "top-center",
          className: "custom-toast-error",
          bodyClassName: "customToast",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP and email: ", error);
      toast.error(error.message, {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
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
      <section className="mb-20 sm:mb-0 mt-6 lg:mx-0 sm:mt-0 lg:w-1/2 w-[90%] mx-auto flex items-center justify-center bg-white font-raleway p-4 sm:p-6 lg:p-8">
        <div className="max-w-[40rem] mx-16 w-full">
          <div
            className="flex items-center gap-1 sm:gap-2 mb-3 font-raleway text-lg"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoIosArrowBack size={25} className="cursor-pointer" />
            <p className="cursor-pointer">Back</p>
          </div>
          <h2 className="text-2xl sm:text-3xl mb-3 font-semibold">Enter OTP</h2>
          <div className="mb-4 text-gray-400">
            <p>We have shared a code with your registered email address</p>
            <p>{urlEmail} </p>
          </div>
          <div className="flex space-x-1 sm:space-x-7 justify-center mb-10">
            {otp.map((data, index) => {
              return (
                <input
                  className="w-12 h-12 text-center text-lg border-2 border-gray-300 focus:border-black outline-none rounded"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              );
            })}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="w-full sm:w-[90%] py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 mb-4"
              onClick={() => {
                handleVerifyAndCreateUser();
              }}
            >
              Verify
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OTPVerification;
