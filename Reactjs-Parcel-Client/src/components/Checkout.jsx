import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51QCaJxGHm1Xk7UGKaHw7k2vxjoE3xWgucrBoD3h24ifpIit3SVlMu0W60Q2zaVgVq9OEdEvhpQ4RVQ0THVwHzZIA00HZFGxNrw"
);

const Checkout = () => {
  const location = useLocation();
  const { resBody } = location.state || {};

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("http://localhost:3000/stripe/create-checkout-session", {
      method: "POST",
      body: JSON.stringify(resBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      {/* <h1>Heelllooo</h1> */}
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
export default Checkout;
