import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

function CardSection() {
  return (
    <CardElement
      options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }}
    />
  );
}

export default CardSection;
