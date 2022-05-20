import { getStrapiURL } from "./api";
import noMedia from "../../public/images/no-image.svg";

export function getStrapiMedia(media) {
  const image = media?.data?.attributes || noMedia;

  const url = image.url && image.url;

  const imageUrl = url
    ? url.startsWith("/")
      ? getStrapiURL(url)
      : url
    : image.src;
  return imageUrl;
}
