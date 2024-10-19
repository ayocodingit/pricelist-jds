import { getCustomer } from "./customer";
import { sendTelegram } from "./telegram";

const storeOrder = async (product, orderId, customer, paymentMethod, photo) => {
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
        value: customer.customer,
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
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "98b0c161-eefd-4015-83f8-0abde4268a22",
        type: "text",
        value: paymentMethod,
      },
      {
        uuid_survey: "597cc77c-8c9a-4db4-a4e0-9b06bbf822ed",
        uuid_question: "445940e4-00b4-4745-a350-821a9c7b03e0",
        type: "upload",
        value: photo,
      },
    ],
    submitted_time: 14.018,
  };

  const rawResponse = await fetch(
    import.meta.env.VITE_BASE_URL_JABARFORM + "/v2/answers",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (rawResponse.status != 200) throw new Error("failed store order");

  return await rawResponse.json();
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.set("files", file);
  const rawResponse = await fetch(
    import.meta.env.VITE_BASE_URL_JABARFORM + "/upload",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        ContentType: "multipart/form-data",
      },
      body: formData,
    }
  );
  if (rawResponse.status != 201) throw new Error("failed upload image");

  return await rawResponse.json();
};

export const sendOrders = async (products, paymentMethod, file, message) => {
  // const promises = [];
  // const customer = getCustomer();
  // const orderId = `order-${Date.now()}`;
  // const photo = [];

  // if (paymentMethod !== "cash") {
  //   try {
  //     const res = await uploadImage(file);
  //     const filename = res[0].filename;
  //     photo.push(filename);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // products.forEach((product) =>
  //   promises.push(storeOrder(product, orderId, customer, paymentMethod, photo))
  // );

  // Promise.allSettled(promises).then((res) => console.log(res));
  sendTelegram(message, file)
};
