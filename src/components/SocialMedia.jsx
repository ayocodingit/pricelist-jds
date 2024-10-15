import React from "react";
import {
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

function SocialMedia({ title, size = 25, isGrid = false }) {
  const url = `Haloo Akang Teteh~`;

  return (
    <div className={`flex gap-2 ${isGrid && 'flex-col' }`}>
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={size} round={true} />
      </TelegramShareButton>
      <WhatsappShareButton url={'😋😋😋'} title={title} separator={""}>
        <WhatsappIcon size={size} round={true} />
      </WhatsappShareButton>
    </div>
  );
}

export default SocialMedia;
