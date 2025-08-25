import React from "react";

const LazyImage = ({ src, alt, ...props }) => {
  return <img src={src} alt={alt} loading="lazy" {...props} />;
};

export default LazyImage;

// <LazyImage
//   src="https://picsum.photos/200/300"
//   alt="Lazy loaded image"
//   style={{ width: "100%" }}
// />