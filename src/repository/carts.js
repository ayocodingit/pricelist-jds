import { calculateDiscount } from "../utils/formatter";
import promo from "../utils/promo";

const cartKey = "cart";
const checkoutKey = "checkout";

export const addToCart = ({ id, username }, orderDetail) => {
  let isNewItem = true;
  const product = {
    productId: id,
    id: `${id}-${orderDetail.variant}`,
    username,
    ...orderDetail,
  };
  const products = getAll(cartKey);

  for (const i in products) {
    if (products[i].id == `${id}-${orderDetail.variant}`) {
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
export const getCartByID = (id) =>
  getAll(cartKey).filter((cart) => cart.id === id);
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
    let voucher = calculateDiscount(product.price, product.discount);
    if (product?.promo) {
      const { requirement, code } = product.promo;
      voucher += promo[code](product.qty, requirement.min, requirement.discount);
    }
    checkout.push({
      id: product.id,
      productId: product.productId,
      username: product.username,
      name: product.name,
      qty: product.qty,
      note: product.note,
      variant: product.variant,
      price: product.price,
      voucher: voucher,
    });
    removeItemCart(product.id);
  });
  localStorage.removeItem(checkoutKey);
  localStorage.setItem(checkoutKey, JSON.stringify(checkout));
};
