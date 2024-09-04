import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faShippingFast,
  faTruckLoading,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

const OrderStatusTracker = ({ status }) => {
  const getIconColor = (index) => {
    if (index === status) return "black";
    if (index < status) return "#10B981";
    return "#D1D5DB";
  };

  const statusStages = [
    { icon: faClipboardList, label: "Order Placed" },
    { icon: faShippingFast, label: "Shipped" },
    { icon: faTruckLoading, label: "Out for Delivery" },
    { icon: faBoxOpen, label: "Delivered" },
  ];

  return (
    <div className="flex sm:flex-row flex-col items-start sm:items-center mb-4 mx-3 sm:mx-8 font-semibold relative">
      {statusStages.map((stage, index) => (
        <React.Fragment key={index}>
          <div className="relative z-10 text-center flex flex-col sm:flex-row items-center">
            <div className="flex sm:flex-col gap-1 ">
              <FontAwesomeIcon
                icon={stage.icon}
                className="text-3xl py-3 sm:py-0 sm:mb-0 sm:mr-2"
                style={{
                  color: getIconColor(index),
                }}
              />
              <div className=" py-2 sm:py-0 mt-2">{stage.label}</div>
            </div>
          </div>
          {index < statusStages.length - 1 && (
            <div className="sm:border-t-[1.5px] sm:border-l-0 border-l-[1.5px] border-gray-400 sm:h-0 h-12 sm:flex-1 mx-2 border-dashed"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderStatusTracker;
