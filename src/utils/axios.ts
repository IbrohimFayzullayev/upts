import axios from "axios";

const axiosCredentials = {
  baseURL: "http://188.166.236.68/api",
  headers: {
    Accept: "application/json",
  },
};

export const Axios = axios.create(axiosCredentials);
export const authAxios = axios.create(axiosCredentials);
