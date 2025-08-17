import React from "react";

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="max-w-6xl lg:mx-auto p-5 md:px-10 lg:px-0 w-full grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-8">
          <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]">
            RentNest: Feel at Home, Whatever You Are!
          </h1>

          <p className="text-[20px] md:text-[24px] font-normal leading-[30px] md:leading-9 tracking-[2%] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ea
            vitae voluptates, sed fugit at cupiditate odit officiis veniam
            reprehenderit iure quis doloribus cumque minus, ipsa quisquam
            aperiam. Praesentium optio vero inventore voluptas, ipsam eum qui
            accusamus sint eos temporibus.
          </p>
        </div>
        <img
          src="https://media.istockphoto.com/id/453195517/photo/home-for-rent-sign.jpg?s=612x612&w=0&k=20&c=iYdWJgb5kDLXjh9V52_g3YcX__pYdFauYF7qcaRe8Hw="
          alt=""
          width={1000}
          height={1000}
          className="max-h-[70vh] object-contain object-center "
        />
      </div>
    </div>
  );
};

export default Hero;
