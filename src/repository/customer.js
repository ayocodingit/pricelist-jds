const customerKey = "customer";

export const storeCustomer = (payload) => {
  const item = localStorage.getItem(customerKey);

  if (item) {
    localStorage.removeItem(customerKey);
  }

  localStorage.setItem(customerKey, JSON.stringify(payload));
};

export const getCustomer = () => {
  const item = localStorage.getItem(customerKey);

  if (!item) return {};
  try {
    return JSON.parse(item);
  } catch (error) {
    storeCustomer({ customer: item, isOpen: true });
    return getCustomer();
  }
};

export const checkCompleteCustomer = () => {
  const { customer, telegram } = getCustomer();
  return customer && telegram;
};
