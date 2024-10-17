import React from "react";
import { FaUtensils } from "react-icons/fa";
import { IoFastFoodOutline, IoWaterOutline } from "react-icons/io5";
import { categoryOptions } from "../utils/contstant/category";

function FilterCategory({ handleCategory, category }) {
  return (
    <>
      <li
        className={`p-2 gap-2 hover:cursor-pointer hover:opacity-90 flex items-center shadow-md rounded-md ${
          category =="" ? "text-white bg-primary" : "bg-white"
        }`}
        onClick={() => handleCategory("")}
      >
        <span>All</span>
      </li>
      <li
        className={`p-2 gap-2 hover:cursor-pointer hover:opacity-90 flex items-center shadow-md rounded-md ${
          category == categoryOptions.FOOD ? "text-white bg-primary" : "bg-white"
        }`}
        onClick={() => handleCategory(categoryOptions.FOOD)}
        title={categoryOptions.FOOD}
      >
        <IoFastFoodOutline />
        <span>Food</span>
      </li>
      <li
        className={`p-2 gap-2 hover:cursor-pointer hover:opacity-90 flex items-center  shadow-md rounded-md ${
          category == categoryOptions.DRINK ? "text-white bg-primary" : "bg-white"
        }`}
        onClick={() => handleCategory(categoryOptions.DRINK)}
        title={categoryOptions.DRINK}
      >
        <IoWaterOutline />
        <span>Drink</span>
      </li>
      <li
        className={`p-2 gap-2 hover:cursor-pointer hover:opacity-90 flex items-center  shadow-md rounded-md ${
          category == categoryOptions.INGREDIENTS ? "text-white bg-primary" : "bg-white"
        }`}
        onClick={() => handleCategory(categoryOptions.INGREDIENTS)}
        title={categoryOptions.INGREDIENTS}
      >
        <FaUtensils />
        <span>Ingredients</span>
      </li>
    </>
  );
}

export default FilterCategory;
