import React from "react";
import { categories } from "../data";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="py-12 px-16 sm:px-5 flex flex-col items-center text-center bg-gray-300">
      <h1 className="text-slate-700 text-4xl font-extrabold mb-4">
        Here is our Top Categories
      </h1>

      <p className="max-w-3xl text-lg">
        Find the perfect place to match your mood—whether it is the calm of the
        coast, the energy of iconic cities, or the serenity of the mountains.
      </p>
      <div className="flex flex-wrap py-12 justify-center gap-5">
        {categories?.slice(1, 7).map((category, index) => (
          <Link
            to={`/listings/category/${category.label}`}
            key={category.label}
          >
            <div className="relative flex justify-center items-center w-[250px] h-[200px] cursor-pointer">
              <img
                src={category.img}
                alt={category.label}
                className="absolute w-full h-full object-cover"
              />

              <div className="absolute w-full h-full bg-black/55"></div>

              <div className="relative text-white text-center">
                <div className="text-5xl">{category.icon}</div>
                <p className="font-semibold">{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
