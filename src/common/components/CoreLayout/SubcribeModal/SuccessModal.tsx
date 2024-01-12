import React from "react";

export const SuccessModal = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        alt="success"
        className="mb-4"
        height="96px"
        src="/image/subscribe_star.png"
        width="96px"
      />
      <h1 className="text-[32px] leading-10">Thank you!</h1>
      <p className="mt-3">
        You are now subscribed to the Cred Monitoring Service.
      </p>
    </div>
  );
};
