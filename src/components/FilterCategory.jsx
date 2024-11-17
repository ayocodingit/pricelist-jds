import React from "react";
import { IoFastFoodOutline, IoWaterOutline } from "react-icons/io5";
import { categoryOptions } from "../utils/contstant/category";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";

function FilterCategory({ handleCategory, category }) {
  return (
    <>
      <Card
        radius="sm"
        shadow="sm"
        isPressable
        className={`${
          category == categoryOptions.FOOD
            ? "bg-primary text-white"
            : "bg-gray-200 text-black"
        }`}
        onPress={() => handleCategory(categoryOptions.FOOD)}
      >
        <CardBody className="flex justify-center items-center w-full p-0 gap-2">
          <Image
            alt="Card background"
            className="object-contain w-full h-8 rounded-xl"
            src="/hamburger.png"
          />
<h4 className="text-md capitalize">{categoryOptions.FOOD}</h4>
        </CardBody>
      </Card>
      <Card
        radius="sm"
        shadow="sm"
        isPressable
        className={`py-2 ${
          category == categoryOptions.DRINK
            ? "bg-primary text-white"
            : "bg-gray-200 text-black"
        }`}
        onPress={() => handleCategory(categoryOptions.DRINK)}
      >
        <CardBody className=" flex justify-center items-center w-full p-0">
          <Image
            alt="Card background"
            className="object-contain w-full h-8 rounded-xl"
            src="/drink.png"
          />
        </CardBody>
        <CardFooter className=" flex-col items-center">
          <h4 className="text-md capitalize">{categoryOptions.DRINK}</h4>
        </CardFooter>
      </Card>
    </>
  );
}

export default FilterCategory;
