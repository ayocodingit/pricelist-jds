import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { formatNumberIDR } from "../utils/formatter";

function SocialMedia({ product }) {
  const url = `Haloo Akang Teteh~`;
  const size = 25;
  const title = `
Mangga in case ada yg mau beli ~**${product.name}**~
${product.image}
Harganya cuma **${formatNumberIDR(product.price)}** aja

untuk info detail produknya silakan kunjungi di bawah ini yah 
${location.href}

Hatur nuhun~ ✨
`;

  return (
    <div className="flex gap-2 ">
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={size} round={true} />
      </TelegramShareButton>
      <WhatsappShareButton url={'😋😋😋'} title={title} separator={""}>
        <WhatsappIcon size={size} round={true} />
      </WhatsappShareButton>
      <FacebookShareButton url={url} hashtag={title}>
        <FacebookIcon size={size} round={true} />
      </FacebookShareButton>
    </div>
  );
}

export default SocialMedia;
