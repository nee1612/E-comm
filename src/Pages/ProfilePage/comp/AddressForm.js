import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { addDoc, doc, updateDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { address } from "../../../Config/firebase";
import UserContext from "../../../Context/UserContext";

const AddressForm = ({ editingAddress, fetchAddresses, closeModal }) => {
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

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        name: editingAddress.name || "",
        flat: editingAddress.flat || "",
        area: editingAddress.area || "",
        pincode: editingAddress.pincode || "",
        city: editingAddress.city || "",
        state: editingAddress.state || "",
      });
    }
  }, [editingAddress]);

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
      const addressRef = collection(address, "address");
      if (editingAddress) {
        await updateDoc(doc(addressRef, editingAddress.id), formData);
        toast.success("Address updated successfully");
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
      closeModal(); // Close the modal after submission
    } catch (error) {
      console.error("Error adding or updating address: ", error);
      toast.error("Failed to save address. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">
          Flat, House no., Building, Company, Apartment
        </label>
        <input
          type="text"
          placeholder="Flat, House no., Building, Company, Apartment"
          value={formData.flat}
          onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">
          Area, Colony, Street, Sector, Village
        </label>
        <input
          type="text"
          placeholder="Area, Colony, Street, Sector, Village"
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Pin Code</label>
        <input
          type="text"
          placeholder="Enter Pincode"
          value={formData.pincode}
          onChange={(e) =>
            setFormData({ ...formData, pincode: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">City</label>
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2"
          required
          readOnly
        />
      </div>
      <div>
        <label className="block text-gray-700">State</label>
        <input
          type="text"
          placeholder="State"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2"
          required
          readOnly
        />
      </div>
      <button
        type="submit"
        disabled={isAdding}
        className="w-full bg-black text-white rounded-md py-2"
      >
        {isAdding
          ? editingAddress
            ? "Updating Address..."
            : "Adding Address..."
          : editingAddress
          ? "Update Address"
          : "Add Address"}
      </button>
    </form>
  );
};

export default AddressForm;
