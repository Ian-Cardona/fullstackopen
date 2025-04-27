import axios from "axios";
const baseUrl = "/api/login";

const login = async (value) => {
  const response = await axios.post(baseUrl, value);
  return response.data;
};

export default { login };
