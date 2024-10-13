import React from "react";
import { FaUtensils } from "react-icons/fa";
import { IoFastFoodOutline, IoWaterOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

function Filter({ handleCategory, category }) {
  return (
    <div>
      <ul className="flex items-center text-black p-2 gap-1 text-2xl">
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
            category == "makanan" && "text-primary"
          }`}
          onClick={() => handleCategory("makanan")}
          title="makanan"
        >
          <IoFastFoodOutline />
          <span className="text-sm">Food</span>
        </li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
            category == "minuman" && "text-primary"
          }`}
          onClick={() => handleCategory("minuman")}
          title="minuman"
        >
          <IoWaterOutline />
          <span className="text-sm">Drink</span>
        </li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
            category == "bahan-bahan" && "text-primary"
          }`}
          onClick={() => handleCategory("bahan-bahan")}
          title="bahan-bahan"
        >
          <FaUtensils />
          <span className="text-sm">ingredients</span>
        </li>
        {category != "" && (
          <li
            className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
              category == "" && "text-primary"
            }`}
            onClick={() => handleCategory("")}
            title="Reset"
          >
            <AiOutlineClose />
            <span className="text-sm">Reset Filter</span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Filter;
