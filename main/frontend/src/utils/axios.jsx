import axios from "axios";
import { HOST_API_KEY } from "../config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });
const axios1 = axios.create({ baseURL: "https://api-dev-minimal-v6.vercel.app/" });

axios1.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export { axios1 }
export default axiosInstance;
