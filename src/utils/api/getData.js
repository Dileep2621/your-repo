import axios from "axios";

export const fetchDataAPI = async (search, itemsPerPage, offset) => {
  try {
    const response = await axios.get(
      "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      {
        params: {
          namePrefix: search,
          limit: itemsPerPage,
          offset: offset,
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_API_URL,
        },
      }
    );

    return response;
  } catch (error) {
    return error.message;
  }
};
