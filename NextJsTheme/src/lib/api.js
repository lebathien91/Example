import qs from "qs";
import { PAGE_SIZE } from "next.config";

// import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${process.env.API_URL || "https://kuchuoi.herokuapp.com"}${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}

// export function fetchSWR(path, urlParamsObject = {}, prefetchedData = []) {

//   const queryString = qs.stringify(urlParamsObject);
//   const requestUrl = `${path}${queryString ? `?${queryString}` : ""}`;

//   const { data, error } = useSWR(requestUrl, fetchAPI, {
//     fallbackData: prefetchedData,
//   });

//   return { data, error };
// }

// Hàm tải trang cho phân trang
export function fetchSWRPagination(path, urlParamsObject) {
  // Merge default and user options

  const getKey = (pageIndex, previousPageData) => {
    pageIndex = pageIndex + 1;

    if (previousPageData?.data && !previousPageData.data.length) return null;

    const queryObject = {
      ...urlParamsObject,
      pagination: {
        page: pageIndex,
        pageSize: PAGE_SIZE,
      },
    };
    const queryString = qs.stringify(queryObject);
    const requestUrl = `${path}?${queryString}`;

    return requestUrl; // SWR key
  };
  // Trigger API call

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetchAPI);

  let pageData = [];
  if (data) {
    data.forEach((item) => {
      pageData = pageData.concat(item.data);
    });
  }

  const isLoading = size > 0 && data && typeof data[size - 1] === "undefined";

  const isLoadding = !data || isLoading;

  const isReachedEnd = data && data[data.length - 1]?.data.length < PAGE_SIZE;

  return { pageData, error, size, setSize, isReachedEnd, isLoadding };
}
