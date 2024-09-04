import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import OrderStatusTracker from "./OrderStatusTracker";
import { address } from "../../../Config/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import Loader from "../../../Componetns/Loader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const OrderDetailsPopup = ({ order, isPopupOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const popupRef = useRef(null); // Reference to the popup content

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const addressDocRef = doc(address, "address", order.address);
      const addressDoc = await getDoc(addressDocRef);

      if (addressDoc.exists()) {
        setAddressData(addressDoc.data());
      } else {
        console.error("No such address document!");
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen && order && order.address) {
      fetchAddress();
    }
  }, [order, isPopupOpen]);

  const downloadInvoiceAsPDF = async () => {
    if (!popupRef.current) return;

    // Wait for the fonts to load
    await document.fonts.ready;

    try {
      const rect = popupRef.current.getBoundingClientRect();
      const canvas = await html2canvas(popupRef.current, {
        useCORS: true,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: rect.width,
        windowHeight: popupRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let position = 0;

      while (position < canvas.height) {
        pdf.addImage(imgData, "PNG", 0, -position, imgWidth, imgHeight);
        position += pdfHeight;
        if (position < canvas.height) {
          pdf.addPage();
        }
      }

      pdf.save(`invoice_${order.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg shadow-lg w-[94%] sm:w-[80%] lg:w-[60%] max-h-[90vh] p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          <div ref={popupRef}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Order Details
              </h2>
              <button
                className="text-gray-500 hover:text-gray-800 text-lg sm:text-xl"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Order Information</h3>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Ordered On:</strong>{" "}
                {order.createdAt &&
                  moment(order.createdAt.toDate()).format("MMM Do YY")}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Ordered Items</h3>
              {order.products.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b border-gray-200"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">
                      ${item.price * item.quantity}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            <OrderStatusTracker status={0} />

            <div className="mb-4 mt-6">
              <h3 className="text-lg font-semibold">Shipping Address</h3>
              {addressData && (
                <>
                  <p>{addressData.name}</p>
                  <p>
                    {addressData.flat} {addressData.area}
                  </p>
                  <p></p>
                  <p>
                    {addressData.city}, {addressData.state}
                  </p>
                  <p></p>
                  <p>{addressData.pincode}</p>
                </>
              )}
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold ">Payment Details :</h3>
              <p>
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod.charAt(0).toUpperCase() +
                  order.paymentMethod.slice(1)}
              </p>
              <p>
                <strong>Total Amount:</strong> $ {order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <button
            onClick={downloadInvoiceAsPDF} // Add click event to download PDF
            className="bg-cyan-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-cyan-700 transition"
          >
            Download Invoice
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPopup;
