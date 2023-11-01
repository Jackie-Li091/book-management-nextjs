import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import router from "next/router";
import { message as AntdMessage } from "antd";

interface AxiosInstanceType extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

export const CreateAxiosInstance = (
  config?: AxiosRequestConfig
): AxiosInstanceType => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
  });

  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response: any) {
      const { status, data, message } = response;
      if (status === 200) return data;
      else if (status === 401) return router.push("/login"); //no login
      else AntdMessage.error(message || "Server error!");
    },
    function (error) {
      if (error.response && error.response.status === 401)
        return router.push("/login");
      AntdMessage.error(error?.response?.data?.message || "Server error!");
      return Promise.reject(error);
    }
  );

  return instance;
};

export default CreateAxiosInstance({});
