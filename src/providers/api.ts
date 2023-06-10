import { getAccessToken } from "@/utils/cookie";
import axios from "axios";

// A request that requires a token
export const authenticatedRequest = () => {
  const accessToken = getAccessToken("userInfo");

  if (!accessToken) return null;

  return axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// A request that don't require a token
export const unauthenticatedRequest = () => {
  return axios.create({
    baseURL: "http://localhost:8080",
  });
};
