import axios from "axios";

const axiosCredentials = {
  baseURL: "https://upts.uz/api",
  headers: {
    Accept: "application/json",
  },
};

export const Axios = axios.create(axiosCredentials);
export const authAxios = axios.create(axiosCredentials);
