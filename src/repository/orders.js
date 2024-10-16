const storeOrder = async (product, orderId, customer) => {
  const body = {
    answers: [
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "0e74fafb-50ce-4aad-af55-8c8b563e4eb4",
        type: "text",
        value: orderId,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "41410412-a9f9-4c0b-87a9-35e3f58c6c39",
        type: "text",
        value: product.username,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "f63f141a-755d-45fd-ac9e-1162d476519b",
        type: "text",
        value: customer,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "044fad74-16c9-41aa-be44-052302a2c127",
        type: "text",
        value: product.id,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "0cd7d044-c1db-465e-81b5-99c83f703578",
        type: "text",
        value: product.name,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "e4b1038e-0027-4844-a981-276d77400a12",
        type: "text",
        value: product.price,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "b097f8ba-dabe-41cd-af01-ecf475b22880",
        type: "number",
        value: product.qty,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "adc487f7-e6db-48b3-b8bf-68d522d7b721",
        type: "number",
        value: product.price * product.qty,
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

export const sendOrders = (products, customer = "") => {
  const promises = [];
  const orderId = `order-${Date.now()}`;
  products.forEach((product) =>
    promises.push(storeOrder(product, orderId, customer))
  );

  Promise.allSettled(promises).then((res) => console.log(res));
};
