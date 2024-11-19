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
        radius="md"
        shadow="sm"
        isPressable
        className={`${
          category == categoryOptions.FOOD
            ? "bg-primary text-white"
            : "bg-gray-200 text-black"
        }`}
        onPress={() => handleCategory(categoryOptions.FOOD)}
      >
        <CardBody className="flex justify-center items-center w-full gap-2">
          <Image
            alt="Card background"
            className="object-contain w-8 h-8 rounded-xl hidden"
            src="/hamburger.png"
          />
<h4 className="text-sm capitalize">{categoryOptions.FOOD}</h4>
        </CardBody>
      </Card>
      <Card
        radius="lg"
        shadow="sm"
        isPressable
        className={`${
          category == categoryOptions.DRINK
            ? "bg-primary text-white"
            : "bg-gray-200 text-black"
        }`}
        onPress={() => handleCategory(categoryOptions.DRINK)}
      >
        <CardBody className="flex justify-center items-center w-full gap-2">
          <Image
            alt="Card background"
            className="object-contain w-8 h-8 hidden rounded-xl"
            src="/drink.png"
          />
<h4 className="text-sm capitalize">{categoryOptions.DRINK}</h4>
        </CardBody>
      </Card>
      <Card
        radius="md"
        shadow="sm"
        isPressable
        className={`border-[1px] ${
          category == categoryOptions.SNACK
            ? "border-primary text-primary"
            : "border-gray-200 text-black"
        }`}
        onPress={() => handleCategory(categoryOptions.SNACK)}
      >
        <CardBody className="flex justify-center items-center w-full p-1 gap-2">
<h4 className="text-sm capitalize">{categoryOptions.SNACK}</h4>
        </CardBody>
      </Card>
    </>
  );
}

export default FilterCategory;
