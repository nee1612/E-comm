import React from "react";
import emailjs from "emailjs-com";

const SendOrderConfirmationEmail = async (templateParams) => {
  try {
    const response = await emailjs.send(
      "service_9zo2tlv", // Your EmailJS service ID
      "template_wbpwoo9", // Your EmailJS template ID
      templateParams,
      "U48J8PfQwkYnnO9yE" // Your public key
    );

    return response;
  } catch (error) {
    console.error("Failed to send order confirmation email...", error);
    throw error;
  }
};

export default SendOrderConfirmationEmail;
