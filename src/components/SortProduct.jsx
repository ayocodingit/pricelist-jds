import React from "react";
import { AiOutlineSortAscending, AiOutlineDollar } from "react-icons/ai";

function SortProduct({ handleSort, sort }) {
  return (
      <ul className="flex items-center text-black gap-1 text-2xl">
        <li className="text-sm">Sort:</li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
            sort == 'A-Z' && "text-primary"
          }`}
          onClick={() => handleSort('A-Z')}
          title={'A-Z'}
        >
          <AiOutlineSortAscending />
        </li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
            sort == 'discount' && "text-primary"
          }`}
          onClick={() => handleSort('discount')}
          title={'discount'}
        >
          <AiOutlineDollar />
        </li>
      </ul>
  );
}

export default SortProduct;
