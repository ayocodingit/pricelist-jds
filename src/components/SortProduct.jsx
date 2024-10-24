import React from "react";
import { AiOutlineSortAscending, AiOutlineDollar } from "react-icons/ai";
import { sortOptions } from "../utils/contstant/sort";
import { BiCube } from "react-icons/bi";

function SortProduct({ handleSort, sort }) {
  return (
      <>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex gap-1 items-center bg-white rounded-md ${
            sort == sortOptions.NAME ? "text-primary" :  "text-black"
          }`}
          onClick={() => handleSort(sortOptions.NAME)}
          title={sortOptions.NAME}
        >
          <AiOutlineSortAscending />
          <span className="first-letter: capitalize">{sortOptions.NAME}</span>
        </li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex gap-1 items-center bg-white rounded-md ${
            sort == sortOptions.PRICE ? "text-primary" :  "text-black"
          }`}
          onClick={() => handleSort(sortOptions.PRICE)}
          title={sortOptions.PRICE}
        >
          <AiOutlineDollar />
           <span className="first-letter: capitalize">{sortOptions.PRICE}</span>
        </li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex gap-1 items-center bg-white rounded-md  ${
            sort == sortOptions.STOK ? "text-primary" :  "text-black"
          }`}
          onClick={() => handleSort(sortOptions.STOK)}
          title={sortOptions.STOK}
        >
          <BiCube />
           <span className="first-letter: capitalize">{ sortOptions.STOK }</span>
        </li>
      </>
  );
}

export default SortProduct;
