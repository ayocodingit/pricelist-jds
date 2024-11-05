import React from "react";
import { IoFastFoodOutline, IoWaterOutline } from "react-icons/io5";
import { categoryOptions } from "../utils/contstant/category";

function FilterCategory({ handleCategory, category }) {
  return (
    <>
      <li
        className={`p-2 gap-2 hover:cursor-pointer hover:opacity-90 flex flex-col items-center shadow-lg rounded-md ${
          category == categoryOptions.FOOD ? "bg-primary text-white" : "bg-gray-200 text-black"
        }`}
        onClick={() => handleCategory(categoryOptions.FOOD)}
        title={categoryOptions.FOOD}
      >
        <img src="/hamburger.png" alt="food image" width={30} />
        <span className="first-letter: capitalize">{categoryOptions.FOOD}</span>
      </li>
      <li
        className={`p-2 gap-2 hover:cursor-pointer hover:opacity-90 flex flex-col items-center  shadow-lg rounded-md ${
          category == categoryOptions.DRINK ? "bg-primary text-white" : "bg-gray-200 text-black"
        }`}
        onClick={() => handleCategory(categoryOptions.DRINK)}
        title={categoryOptions.DRINK}
      >
        <img src="/drink.png" alt="drink image" width={30}/>
        <span className="first-letter: capitalize">
          {categoryOptions.DRINK}
        </span>
      </li>
    </>
  );
}

export default FilterCategory;
