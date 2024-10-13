const key = "products";
export const addToCart = (item, qty) => {
  let isNewItem = true;
  const product = {
    ...item,
    qty,
  };
  const products = getAllCart();

  for (const i in products) {
    if (products[i].id == product.id) {
      products[i] = product;
      isNewItem = false;
      break;
    }
  }

  if (isNewItem) products.pop(product);

  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(products));

  return isNewItem;
};

export const getAllCart = () => {
  const storage = localStorage.getItem(key);
  let carts = [];

  if (storage) {
    carts = JSON.parse(storage) || [];
  }

  return carts;
};

export const getCountCart = () => {
  return getAllCart().length;
};

export const removeItemCart = (id) => {
  let products = getAllCart();

  products = products.filter((product) => product.id != id);

  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(products));
};

export const removeAllCart = () => {
  localStorage.removeItem(key);
};
