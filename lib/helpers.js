import axios from "axios";
import { stegaClean } from "@sanity/client/stega";

export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const getTotalNumberOfPaginatedPages = (
  totalNumberOfPosts,
  paginatedItemsPerPage
) => Math.ceil(totalNumberOfPosts / paginatedItemsPerPage);

export const isLastPaginatedPage = (totalNumberOfPaginatedPages, activePage) =>
  totalNumberOfPaginatedPages === activePage;

export const getPaginationContext = async (
  query,
  paginatedItemsPerPage,
  activePage
) => {
  const totalNumberOfPosts = await query;
  const totalNumberOfPaginatedPages = getTotalNumberOfPaginatedPages(
    totalNumberOfPosts,
    paginatedItemsPerPage
  );
  const lastPaginatedPage = isLastPaginatedPage(
    totalNumberOfPaginatedPages,
    activePage
  );
  return {
    totalNumberOfPosts,
    totalNumberOfPaginatedPages,
    lastPaginatedPage,
  };
};

export const postPayload = async (url, payload, headers) => {
  try {
    const payloadResponse = await axios.post(url, payload, {
      headers,
    });
    return payloadResponse;
  } catch (err) {
    throw err.response;
  }
};

export const checkValidJSONString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const checkValidJS = (str) => {
  try {
    new Function(`${str}`)();
  } catch (e) {
    return false;
  }
  return true;
};

export const getCleanValue = (value, validator = (v) => v && v.length > 0) => {
  const cleaned = stegaClean(value);
  return validator(cleaned) ? cleaned : undefined;
};

export const parseArrayString = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  return null;
};
