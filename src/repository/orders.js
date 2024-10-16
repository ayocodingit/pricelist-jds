import { getAttrDate } from "../utils/date";

const storeOrder = async (product) => {
  const body = {
    answers: [
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "0e74fafb-50ce-4aad-af55-8c8b563e4eb4",
        type: "text",
        value: `order-${Date.now()}`,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "41410412-a9f9-4c0b-87a9-35e3f58c6c39",
        type: "text",
        value: product.username,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "0cd7d044-c1db-465e-81b5-99c83f703578",
        type: "text",
        value: product.name,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "b097f8ba-dabe-41cd-af01-ecf475b22880",
        type: "number",
        value: product.qty,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "dc6cbbc0-b7c9-4b48-b861-e2823b047d7d",
        type: "text",
        value: product.note,
      },
    ],
    submitted_time: 14.018,
  };

  const rawResponse = await fetch(import.meta.env.VITE_BASE_URL_JABARFORM, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await rawResponse.json();
};

export const sendOrders = (products) => {
  const promises = [];
  products.forEach((product) => promises.push(storeOrder(product)));

  Promise.allSettled(promises).then((res) => console.log(res));
};
