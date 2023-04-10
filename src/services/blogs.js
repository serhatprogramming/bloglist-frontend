import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
