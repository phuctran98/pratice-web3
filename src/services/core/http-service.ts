import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import StorageUtils from "../../utils/storage";

export class HttpClient {
  axiosInstance: AxiosInstance;

  constructor(isAdmin = false) {
    const tokenAccess = StorageUtils.getToken();
    let configs: AxiosRequestConfig = {
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + tokenAccess,
        msgSignature:
          (isAdmin
            ? process.env.REACT_APP_MESSAGE_SIGNATURE_ADMIN
            : process.env.REACT_APP_MESSAGE_SIGNATURE) || "",
      },
      timeout: 180000,
      transformRequest: [
        (data, headers) => {
          if (data instanceof FormData) {
            if (headers) {
              delete headers["Content-Type"];
            }
            return data;
          }
          return JSON.stringify(data);
        },
      ],
    };

    this.axiosInstance = axios.create(configs);
  }
}
