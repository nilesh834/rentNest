import React from "react";
import banner from "../assets/rentphoto.jpg";

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="max-w-6xl lg:mx-auto p-5 md:px-10 lg:px-0 w-full grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-8">
          <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]">
            RentNest: Feel at Home, Whatever You Are!
          </h1>

          <p className="text-[20px] md:text-[24px] font-normal leading-[30px] md:leading-9 tracking-[2%] ">
            Finding the right place to live shouldn’t be stressful. That’s why
            we built RentNest, a platform that makes discovering, managing, and
            booking homes simple. From first apartments to family residences or
            short-term stays, we’ve got you covered. With RentNest, you’ll find
            a home that feels just right—quickly and easily.
          </p>
        </div>
        <img
          src={banner}
          alt="banner pic"
          width={1000}
          height={1000}
          className="max-h-[70vh] object-contain object-center "
        />
      </div>
    </div>
  );
};

export default Hero;
