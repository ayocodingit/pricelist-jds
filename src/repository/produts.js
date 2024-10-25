import { sortOptions } from "../utils/contstant/sort";

export const fetchProducts = async () => {
  try {
    const res = await fetch(`/api/products.json`);
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
};

const getFunctionSort = (sort) => {
  let func = sortAscByName;
  switch (sort) {
    case sortOptions.PRICE:
      func = sortDescByPrice;
      break;
    case sortOptions.STOK:
      func = sortDescByStock;
      break;
  }
  return func;
};

export const getProducts = (products, { q = "", category = "", sort = "", ids = [] }) => {
  const funcSort = getFunctionSort(sort);
  if (q == "" && category == "")
    return funcSort(products.filter((product) => product));

  const regex = new RegExp(q, "gi");

  return funcSort(
    products.filter(
      (product) => product.name.match(regex) && category == product.category
    )
  );
};

export const getByIDs = (products, ids) => {
  return products.filter((product) => ids.indexOf(product.id) === 0)
}

export const getByID = (products, id) => {
  return products.filter((product) => product.id == id)[0];
};

const sortDescByStock = (products) => {
  return products.sort((a, b) => {
    return b.stock - a.stock;
  });
};

const sortDescByPrice = (products) => {
  return products.sort((a, b) => {
    return a.price - b.price;
  });
};

const sortAscByName = (products) => {
  return products.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};
