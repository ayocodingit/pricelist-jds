const customerKey = "customer";

export const storeCustomer = (username) => {
  const item = localStorage.getItem(customerKey);

  if (item) {
    localStorage.removeItem(customerKey);
  }

  localStorage.setItem(customerKey, JSON.stringify({ username }));
};

export const getCustomer = () => {
  const item = localStorage.getItem(customerKey);

  if (!item) return item;
  try {
    return JSON.parse(item);
  } catch (error) {
    storeCustomer(item);
    return getCustomer();
  }
};
