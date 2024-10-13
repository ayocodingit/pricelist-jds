import React from "react";
import { AiOutlineSortAscending, AiOutlineDollar } from "react-icons/ai";

function SortProduct({ handleSort, sort }) {
  return (
      <ul className="flex items-center text-black p-2 gap-1 text-xl">
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
            sort == 'name' && "text-primary"
          }`}
          onClick={() => handleSort('name')}
          title={'name'}
        >
          <AiOutlineSortAscending />
          <span className="text-sm">Name</span>
        </li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex flex-col items-center ${
            sort == 'discount' && "text-primary"
          }`}
          onClick={() => handleSort('discount')}
          title={'discount'}
        >
          <AiOutlineDollar />
           <span className="text-sm">Discount</span>
        </li>
      </ul>
  );
}

export default SortProduct;
