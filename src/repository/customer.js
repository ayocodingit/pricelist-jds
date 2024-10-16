const customerKey = "customer";

export const storeCustomer = (username) => {
  const item = localStorage.getItem(customerKey);

  if (item) {
    localStorage.removeItem(customerKey);
  }

  localStorage.setItem(customerKey, username);
};

export const getCustomer = () => {
  return localStorage.getItem(customerKey) || "";
};
