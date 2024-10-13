import React from "react";
import { FaUtensils } from "react-icons/fa";
import { IoFastFoodOutline, IoWaterOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { categoryOptions } from "../utils/contstant/category";

function FilterCategory({ handleCategory, category }) {
  return (
      <ul className="flex items-center text-black p-2 gap-1 text-xl overflow-x-auto w-48 md:w-full">
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
            category == categoryOptions.FOOD && "text-primary"
          }`}
          onClick={() => handleCategory(categoryOptions.FOOD)}
          title={categoryOptions.FOOD}
        >
          <IoFastFoodOutline />
          <span className="text-sm">Food</span>
        </li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
            category == categoryOptions.DRINK && "text-primary"
          }`}
          onClick={() => handleCategory(categoryOptions.DRINK)}
          title={categoryOptions.DRINK}
        >
          <IoWaterOutline />
          <span className="text-sm">Drink</span>
        </li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
            category == categoryOptions.INGREDIENTS && "text-primary"
          }`}
          onClick={() => handleCategory(categoryOptions.INGREDIENTS)}
          title={categoryOptions.INGREDIENTS}
        >
          <FaUtensils />
          <span className="text-sm">Ingredients</span>
        </li>
        
        {category != "" && (
          <li
            className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center`}
            onClick={() => handleCategory("")}
            title="Reset"
          >
            <AiOutlineClose />
            <span className="text-sm">Reset</span>
          </li>
        )}
      </ul>
  );
}

export default FilterCategory;
