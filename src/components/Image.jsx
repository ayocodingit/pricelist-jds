import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Skeleton from "./Skeleton";

function Image({ src, alt, className }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
     return (
      <div className="w-full rounded-md">
        <Skeleton className={className}/>
      </div>
    );
  }
   

  return (
    <PhotoProvider>
      <PhotoView src={src}>
        <img src={src} alt={alt} className={className} />
      </PhotoView>
    </PhotoProvider>
  );
}

export default Image;
