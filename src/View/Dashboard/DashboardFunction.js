import React, { useState } from "react";
import { UserSubscribe } from "../../Model/postdb";

const DashboardFunction = () => {
  const [subscribeInput, setSubscribe] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subError, setSubError] = useState(false);
  const [subMessage, setSubMessage] = useState("");
  let email;

  const userProfile = localStorage.getItem("user");
  const user = JSON.parse(userProfile);
  email = user?.email || "";

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();

    if (!subscribeInput) {
      setSubMessage("Please enter a valid email.");
      setSubError(true);
      setSubLoading(false);
      return;
    }

    if (subscribeInput !== email) {
      setSubMessage("this email is not the email which is logged in.");
      setSubError(true);
      setSubLoading(false);
      setTimeout(() => {
        setSubMessage("");
        setSubscribe("");
        setSubLoading(false);
        setSubError(false);
      }, 3000);
      return;
    }

    setSubLoading(true);
    try {
      const result = await UserSubscribe(subscribeInput);

      if (result?.ok) {
        setSubError(false);
        setSubscribe("");
        setSubMessage(`${subscribeInput} subscribed successfully.`);
      } else {
        setSubError(true);
        setSubMessage(result?.errorMessage || "Failed to subscribe.");
      }
    } catch (error) {
      setSubMessage("Error occurred while subscribing.");
      setSubError(true);
    } finally {
      setTimeout(() => {
        setSubMessage("");
        setSubscribe("");
        setSubLoading(false);
        setSubError(false);
      }, 3000);
    }
  };

  return {
    handleSubscribeSubmit,
    subscribeInput,
    setSubscribe,
    subLoading,
    subError,
    subMessage,
  };
};

export default DashboardFunction;
