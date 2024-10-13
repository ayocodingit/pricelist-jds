export const addToCart = (item, qty) => {
  let isNewItem = true;
  const product = {
    ...item,
    qty,
  };
  const storage = localStorage.getItem("carts");

  let carts = [];

  if (storage) {
    carts = JSON.parse(storage) || [];
  }

  for (var i in carts) {
    if (carts[i].id == product.id) {
      carts[i] = product;
      isNewItem = false;
      break;
    }

    carts.push(product);
  }

  if (carts.length == 0) {
    carts.push(product);
  }

  if (!isNewItem) localStorage.removeItem("carts");

  localStorage.setItem("carts", JSON.stringify(carts));

  return isNewItem;
};

export const getAllCart = () => {
  const storage = localStorage.getItem("carts");
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

  localStorage.removeItem("carts");
  localStorage.setItem("carts", JSON.stringify(products));
};
