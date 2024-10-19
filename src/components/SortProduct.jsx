import React from "react";
import { AiOutlineSortAscending, AiOutlineDollar, AiOutlinePercentage } from "react-icons/ai";

function SortProduct({ handleSort, sort }) {
  return (
      <>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex gap-1 items-center bg-white rounded-md ${
            sort == 'name' ? "text-primary" :  "text-black"
          }`}
          onClick={() => handleSort('name')}
          title={'name'}
        >
          <AiOutlineSortAscending />
          <span>Name</span>
        </li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex gap-1 items-center bg-white ${
            sort == 'price' ? "text-primary" :  "text-black"
          }`}
          onClick={() => handleSort('price')}
          title={'price'}
        >
          <AiOutlineDollar />
           <span>Price</span>
        </li>
        <li
          className={`p-1  hover:cursor-pointer hover:opacity-90 flex gap-1 items-center bg-white ${
            sort == 'discount' ? "text-primary" :  "text-black"
          }`}
          onClick={() => handleSort('discount')}
          title={'discount'}
        >
          <AiOutlinePercentage />
           <span>Discount</span>
        </li>
      </>
  );
}

export default SortProduct;
