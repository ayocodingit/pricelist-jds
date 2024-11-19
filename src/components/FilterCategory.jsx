import React from "react";
import { IoFastFoodOutline, IoWaterOutline } from "react-icons/io5";
import { categoryOptions } from "../utils/contstant/category";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Tab,
  Tabs,
} from "@nextui-org/react";

const filters = Object.entries(categoryOptions);

function FilterCategory({ handleCategory, category }) {
  return (
    <>
      <Tabs variant="underlined" aria-label="Filter Category" onSelectionChange={(key) => handleCategory(key)}>
        {filters.map((value) => (
          <Tab key={value[1]} title={value[1]} className="capitalize" />
        ))}
      </Tabs>
    </>
  );
}

export default FilterCategory;
