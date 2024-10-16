const productsKey = "products";
const checkoutKey = "checkout";

export const addToCart = (item, qty, note = '') => {
  let isNewItem = true;
  const product = {
    ...item,
    note,
    qty,
  };
  const products = getAll(productsKey);

  for (const i in products) {
    if (products[i].id == product.id) {
      products[i] = product;
      isNewItem = false;
      break;
    }
  }

  if (isNewItem) products.unshift(product);

  localStorage.removeItem(productsKey);
  localStorage.setItem(productsKey, JSON.stringify(products));

  return isNewItem;
};


const getAll = (key, username = '') => {
  const storage = localStorage.getItem(key);
  let carts = [];

  if (storage) {
    carts = JSON.parse(storage) || [];
  }
  if (username) {
      carts = carts.filter((product) => product.username == username)
  }
  return carts;
};

export const getAllCart = (username = '') => getAll(productsKey, username)
export const getAllCheckout = () => getAll(checkoutKey)

export const getCountCart = () => {
  return getAll(productsKey).length;
};

export const removeItemCart = (id) => {
  let products = getAll(productsKey);

  products = products.filter((product) => product.id != id);

  localStorage.removeItem(productsKey);
  localStorage.setItem(productsKey, JSON.stringify(products));
};

export const removeAllCart = () => {
  localStorage.removeItem(productsKey);
};

export const removeAllCheckout = () => {
  localStorage.removeItem(checkoutKey);
};

export const moveToCheckOut = (products) => {
    products.forEach((product) => removeItemCart(product.id))
    localStorage.removeItem(checkoutKey);
    localStorage.setItem(checkoutKey, JSON.stringify(products));
};
