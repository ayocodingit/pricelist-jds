export const getAttrDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  return {
    month,
    year,
    date,
  };
};
