export const formatNumberIDR = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    unitDisplay: "narrow",
  }).format(number);
};

export const calculateDiscount = (price, discount) => {
  const voucher = (price / 100) * discount;
  return price - voucher;
};
