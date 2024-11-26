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

  sessionStorage.removeItem(cartKey);
  sessionStorage.setItem(cartKey, JSON.stringify(products));

  return isNewItem;
};

const getAll = (key, username = "") => {
  const storage = sessionStorage.getItem(key);
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

  sessionStorage.removeItem(cartKey);
  sessionStorage.setItem(cartKey, JSON.stringify(products));
};

export const removesItemCart = (ids) => {
  let products = getAll(cartKey);

  products = products.filter((product) => ids.indexOf(product.id) === -1);

  sessionStorage.removeItem(cartKey);
  sessionStorage.setItem(cartKey, JSON.stringify(products));
};

export const removeAllCart = () => {
  sessionStorage.removeItem(cartKey);
};

export const removeAllCheckout = () => {
  sessionStorage.removeItem(checkoutKey);
};

export const moveToCheckOut = (products) => {
  const checkout = [];
  products.forEach((product) => {
    let voucher = calculateDiscount(product.price, product.discount) * product.qty;
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
  sessionStorage.removeItem(checkoutKey);
  sessionStorage.setItem(checkoutKey, JSON.stringify(checkout));
};
