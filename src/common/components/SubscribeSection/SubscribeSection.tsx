import React from "react";

import { Button } from "../Button";

export const SubscribeSection = () => {
  return (
    <div className="relative mt-8 bg-[url('/image/subscribe_background.png')] h-[100px] sm:h-[72px] bg-cover mix-blend-lighten border-2 border-[#5d78ff33] rounded-xl">
      <div className="w-full h-full bg-cred-soft-blue opacity-20 rounded-xl"></div>
      <div className="absolute top-0 flex items-center justify-center w-full h-full gap-x-5">
        <h1 className="text-[24px]">
          Get the latest updates from Cred Protocol
        </h1>
        <a href="https://credprotocol.typeform.com/to/RwA8acq8">
          <Button
            className="font-semibold py-[10xp] rounded-md inline-block"
            variant="primary"
          >
            SUBSCRIBE
          </Button>
        </a>
      </div>
    </div>
  );
};
