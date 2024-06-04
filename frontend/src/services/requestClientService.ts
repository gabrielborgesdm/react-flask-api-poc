import axios from "axios";

const getAxiosClient = () => {
  axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

  return axios;
};

export default getAxiosClient();
