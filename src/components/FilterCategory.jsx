import React from "react";
import { IoFastFoodOutline, IoWaterOutline } from "react-icons/io5";
import { categoryOptions } from "../utils/contstant/category";

function FilterCategory({ handleCategory, category }) {
  return (
    <>
      <li
        className={`p-2 gap-2 hover:cursor-pointer hover:opacity-90 flex flex-col items-center shadow-lg rounded-md bg-primary ${
          category == categoryOptions.FOOD ? "text-white" : "text-gray-500"
        }`}
        onClick={() => handleCategory(categoryOptions.FOOD)}
        title={categoryOptions.FOOD}
      >
        <img src="/hamburger.png" alt="food image" width={35} className={`${category == categoryOptions.FOOD ? 'grayscale-100' : 'grayscale'}`} />
        <span className="first-letter: capitalize">{categoryOptions.FOOD}</span>
      </li>
      <li
        className={`p-2 gap-2 hover:cursor-pointer hover:opacity-90 flex flex-col items-center  shadow-lg rounded-md bg-primary ${
          category == categoryOptions.DRINK ? "text-white" : "text-gray-500"
        }`}
        onClick={() => handleCategory(categoryOptions.DRINK)}
        title={categoryOptions.DRINK}
      >
        <img src="/drink.png" alt="drink image" width={35} className={`${category == categoryOptions.DRINK ? 'grayscale-100' : 'grayscale'}`} />
        <span className="first-letter: capitalize">
          {categoryOptions.DRINK}
        </span>
      </li>
    </>
  );
}

export default FilterCategory;
