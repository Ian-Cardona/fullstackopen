import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  axios
    .get(`${baseUrl}/all`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
    });
};

const getByName = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching country:", error);
  }
};

export default { getAll, getByName };
