import axios from "axios";

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "p-KneI8TdaSm99apI5aZDGW318R-sIwwT9UPKvsHlwM";

export const fetchImages = async (query, page) => {
  const response = await axios.get(API_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY,
    },
  });
  return response.data;
};
