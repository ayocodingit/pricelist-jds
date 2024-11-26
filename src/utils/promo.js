const DealDiscount = (qty, multiple = 2, discountPerPair = 1000) => {
  return Math.floor(qty / multiple) * discountPerPair;
};

export default {
  DealDiscount,
};
