import { calculateDiscount } from "../utils/formatter";

const cartKey = "products";
const checkoutKey = "checkout";

export const addToCart = ({ id, username }, orderDetail) => {
  let isNewItem = true;
  const product = {
    id,
    username,
    ...orderDetail
  };
  const products = getAll(cartKey);

  for (const i in products) {
    if (products[i].id == product.id) {
      products[i] = product;
      isNewItem = false;
      break;
    }
  }

  if (isNewItem) products.unshift(product);

  localStorage.removeItem(cartKey);
  localStorage.setItem(cartKey, JSON.stringify(products));

  return isNewItem;
};

const getAll = (key, username = "") => {
  const storage = localStorage.getItem(key);
  let carts = [];

  if (storage) {
    carts = JSON.parse(storage) || [];
  }
  if (username) {
    carts = carts.filter((product) => product.username == username);
  }
  return carts;
};

export const getAllCart = (username = "") => getAll(cartKey, username);
export const getAllCheckout = () => getAll(checkoutKey);

export const getCountCart = () => {
  return getAll(cartKey).length;
};

export const removeItemCart = (id) => {
  let products = getAll(cartKey);

  products = products.filter((product) => product.id != id);

  localStorage.removeItem(cartKey);
  localStorage.setItem(cartKey, JSON.stringify(products));
};

export const removesItemCart = (ids) => {
  let products = getAll(cartKey);

  products = products.filter((product) => ids.indexOf(product.id) === -1);

  localStorage.removeItem(cartKey);
  localStorage.setItem(cartKey, JSON.stringify(products));
};

export const removeAllCart = () => {
  localStorage.removeItem(cartKey);
};

export const removeAllCheckout = () => {
  localStorage.removeItem(checkoutKey);
};

export const moveToCheckOut = (products) => {
  const checkout = [];
  products.forEach((product) => {
    checkout.push({
      id: product.id,
      username: product.username,
      name: product.name,
      qty: product.qty,
      note: product.note,
      price: calculateDiscount(product.price, product.discount),
    });
    removeItemCart(product.id);
  });
  localStorage.removeItem(checkoutKey);
  localStorage.setItem(checkoutKey, JSON.stringify(checkout));
};
