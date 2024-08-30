// src/components/GenerateTemplateParams.js

import React from "react";

const GenerateTemplateParams = ({
  userDetails,
  orderId,
  cartList,
  selectedAddress,
  selectedPaymentMethod,
}) => {
  const templateParams = {
    customer_name: userDetails.name,
    order_id: orderId,
    order_total: cartList.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ),
    to_email: userDetails.email,
    address: selectedAddress,
    payment_method: selectedPaymentMethod,
    order_date: new Date().toLocaleDateString(),
    products: cartList
      .map((item) => `${item.title} x ${item.quantity}`)
      .join(", "),
  };

  return templateParams;
};

export default GenerateTemplateParams;
