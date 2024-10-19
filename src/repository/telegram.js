export const sendTelegram = async (message, photo) => {
  let formData = new FormData();
  if (photo) formData.set("photo", photo);
  formData.set(photo ? "caption" : "text", message);
  formData.set("parse_mode", "HTML");
  formData.set("chat_id", import.meta.env.VITE_TELEGRAM_CHAT_ID);
  if (!photo) formData = JSON.stringify(Object.fromEntries(formData.entries()));

  const ContentType = {};

  if (photo) {
    Object.assign(ContentType, { ContentType: "multipart/form-data" });
  } else {
    Object.assign(ContentType, { "Content-Type": "application/json" });
  }

  const rawResponse = await fetch(
    `
    ${import.meta.env.VITE_TELEGRAM_BOT}/${
      photo ? "sendPhoto" : "sendMessage"
    }`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...ContentType,
      },
      body: formData,
    }
  );

  if (rawResponse.status != 200) throw new Error("failed send telegram");

  return await rawResponse.json();
};
