import React from "react";
import { useContext } from "react";
import UserContext from "../../../Context/UserContext";
const PersonalInformation = () => {
  const { userDetails } = useContext(UserContext);
  console.log(userDetails);
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600">Name:</label>
          <input
            type="text"
            value={userDetails.displayName}
            className="w-full border border-gray-300 p-2 rounded-lg"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-600">Email:</label>
          <input
            type="email"
            value={userDetails.email}
            className="w-full border border-gray-300 p-2 rounded-lg"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-600">Phone:</label>
          <input
            type="tel"
            value="+1 123 456 7890"
            className="w-full border border-gray-300 p-2 rounded-lg"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
