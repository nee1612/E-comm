import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../../Context/UserContext"; // Assuming you have UserContext for userDetails
import Loader from "../../../Componetns/Loader";

function PaymentHistory() {
  const { userDetails } = useContext(UserContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/payments`,
          {
            userId: userDetails.uid,
          }
        );

        setPayments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userDetails.uid) {
      fetchPayments();
    }
  }, [userDetails.uid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (payments.length === 0) {
    return <p>No payment history found.</p>;
  }

  return (
    <div className="w-full h-full md:h-[calc(100vh-7rem)] p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md overflow-y-auto custom-scrollbar">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-5">Payment History</h2>
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="payment-item border p-4 rounded mb-4"
            >
              <p>
                <strong>Payment ID:</strong> {payment.paymentId}
              </p>
              <p>
                <strong>Amount:</strong> ₹
                {(payment.paymentAmount / 100).toFixed(2)}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(payment.paymentDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {payment.paymentStatus}
              </p>
              <p>
                <strong>Checkout Status:</strong>{" "}
                {payment.userCheckedOut ? "Completed" : "Pending"}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PaymentHistory;
