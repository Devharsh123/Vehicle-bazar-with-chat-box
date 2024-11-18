import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    fetchCheckoutSession();
  }, []);

  const fetchCheckoutSession = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    const res = await fetch(
      `http://localhost:3000/stripe/after-checkout?session_id=${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setStatus(data.status);
    setCustomerEmail(data.customer_email);
  };

  if (status === "open") {
    return (
      <>
        <Navigate to="/checkout" />
      </>
    );
  }

  if (status === "complete") {
    return (
      <>
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to{" "}
            {customerEmail}. If you have any questions, please email{" "}
            <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
      </>
    );
  }

  return null;
};

export default Return;
