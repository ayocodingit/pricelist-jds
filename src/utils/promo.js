const DealDiscount = (qty, multiple = 2, discount = 1000) => {
  return Math.floor(qty / multiple) * discount;
};

function ThresholdDiscount(qty, min, discount) {
  let voucher = 0;
  if (qty >= min) voucher = discount * qty;

  return voucher;
}

export default {
  DealDiscount,
  ThresholdDiscount,
};
