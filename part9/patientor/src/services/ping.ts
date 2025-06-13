import axios from "axios";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<string>(`${apiBaseUrl}/ping`);

  return data;
};

export default { getAll };
