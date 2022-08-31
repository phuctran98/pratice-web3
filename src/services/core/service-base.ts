import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpClient } from "./http-service";

export class ServiceBase extends HttpClient {
    get = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return await this.axiosInstance.get(url, config)
    }
    put = async (url: string, data: any): Promise<AxiosResponse> => {
        return await this.axiosInstance.put(url, data)
    }
    post = async (url: string, params: any): Promise<AxiosResponse> => {
        return await this.axiosInstance.post(url, params);
    };

    delete = async (url: string): Promise<AxiosResponse> => {
        return await this.axiosInstance.delete(url);
    };
}