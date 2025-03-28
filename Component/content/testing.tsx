import React from "react";
import Image from "next/image";
import { div } from "motion/react-client";

const Testing = () => {
  return (
    <div className="w-full h-screen">
      <div className=" w-full h-[80%] overflow-hidden  bg-accent-2">
        <Image
          src={"/image/image_1.png"}
          alt={"landing"}
          width={1920}
          height={1080}
          className="w-full h-[100dvh] object-cover"
        />
      </div>
    </div>
  );
};

export default Testing;
