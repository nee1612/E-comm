import React, { useState, useEffect, useContext } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import axios from "axios";
import { address } from "../Config/firebase";
import UserContext from "../Context/UserContext";
import { toast } from "react-toastify";

function AddAddress({ fetchAddresses, editingAddress, setEditingAddress }) {
  const { userDetails } = useContext(UserContext);
  const [formData, setFormData] = useState({
    userId: userDetails.uid,
    name: "",
    flat: "",
    area: "",
    pincode: "",
    city: "",
    state: "",
  });

  const [isAdding, setIsAdding] = useState(false);
  const addressRef = collection(address, "address");

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        ...editingAddress,
        userId: userDetails.uid,
      });
    }
  }, [editingAddress, userDetails.uid]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const fetchCityState = async (pincode) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];

      if (data.Status === "Success" && data.PostOffice.length > 0) {
        const { District, State } = data.PostOffice[0];

        setFormData((prevData) => ({
          ...prevData,
          city: District || "",
          state: State || "",
        }));
      } else {
        toast.error("Invalid Pincode. Please enter a valid pincode.");
      }
    } catch (error) {
      toast.error("Failed to fetch city and state. Please enter manually.");
    }
  };

  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetchCityState(formData.pincode);
    }
  }, [formData.pincode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      if (editingAddress) {
        await updateDoc(doc(addressRef, editingAddress.id), formData);
        toast.success("Address updated successfully");
        setEditingAddress(null);
      } else {
        await addDoc(addressRef, formData);
        toast.success("Address added successfully");
      }
      setFormData({
        name: "",
        flat: "",
        area: "",
        pincode: "",
        city: "",
        state: "",
      });
      fetchAddresses();
    } catch (error) {
      console.error("Error adding or updating address: ", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-[40rem] bg-white p-8">
      <h2 className="text-2xl font-bold mb-6">
        {editingAddress ? "Edit Address" : "Add Address"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="flat"
          >
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            id="flat"
            type="text"
            value={formData.flat}
            onChange={handleChange}
            placeholder="Flat, House no., Building, Company, Apartment"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="area"
          >
            Area, Colony, Street, Sector, Village
          </label>
          <input
            id="area"
            type="text"
            value={formData.area}
            onChange={handleChange}
            placeholder="Area, Colony, Street, Sector, Village"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="pincode"
          >
            Pin Code
          </label>
          <input
            id="pincode"
            type="text"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter Pin Code"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="city"
          >
            City
          </label>
          <input
            id="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="state"
          >
            State
          </label>
          <input
            id="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full mt-3 bg-black text-white p-3 rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isAdding}
          >
            {isAdding
              ? editingAddress
                ? "Updating Address..."
                : "Adding Address..."
              : editingAddress
              ? "Update Address"
              : "Add New Address"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAddress;
