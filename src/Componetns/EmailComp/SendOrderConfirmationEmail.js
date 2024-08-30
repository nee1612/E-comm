// src/components/SendOrderConfirmationEmail.js

import React from "react";
import emailjs from "emailjs-com";

const SendOrderConfirmationEmail = ({ templateParams }) => {
  const sendEmail = () => {
    emailjs
      .send(
        "service_9zo2tlv",
        "template_wbpwoo9",
        templateParams,
        "U48J8PfQwkYnnO9yE"
      )
      .then(
        (response) => {
          console.log(
            "Order confirmation email sent successfully!",
            response.status,
            response.text
          );
        },
        (error) => {
          console.log("Failed to send order confirmation email...", error);
        }
      );
  };

  React.useEffect(() => {
    sendEmail();
  }, [templateParams]);

  return null; // No UI, just sends the email
};

export default SendOrderConfirmationEmail;
