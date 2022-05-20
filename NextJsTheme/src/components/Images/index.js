import NextImage from "next/image";

import { getStrapiMedia } from "@lib/media";

const Images = ({ image, width, height }) => {
  return (
    <NextImage
      src={getStrapiMedia(image)}
      width={width ? width : image.data.attributes.width}
      height={height ? height : image.data.attributes.height}
      alt={image?.data ? image.data.attributes.alternativeText : ""}
    />
  );
};

export default Images;

Images.defaultProps = {
  width: 740,
  height: 370,
  alt: "alt",
};
