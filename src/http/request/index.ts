import axios from "axios";
import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import {
  clearAuth,
  getTokenAccess,
  getTokenRefresh,
  setAuth,
} from "@/utils/token";
import { ResponseCode } from "./enum";

class NRequest {
  protected instance: AxiosInstance;
  constructor(config: AxiosRequestConfig, prefix: string = "") {
    const { baseURL, ...rest } = config;

    this.instance = axios.create({
      baseURL: prefix ? baseURL + prefix : baseURL,
      ...rest,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }
  private setupRequestInterceptor() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getTokenAccess();
        if (config.headers && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );
  }

  private setupResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response.data,
      (error) => {
        const { status, data } = error.response;
        const originalRequest = error.config;

        if (status === ResponseCode.Fail && !originalRequest._retry) {
          originalRequest._retry = true;
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(this.instance(originalRequest));
            }, 500);
          });
        }

        if (status === ResponseCode.No_AUTHENTICATION && !data.tokenExpired) {
          clearAuth();
          location.href = "/";
        }

        if (
          status === ResponseCode.No_AUTHENTICATION &&
          data.tokenExpired &&
          !originalRequest._retry
        ) {
          const refreshToken = getTokenRefresh();
          originalRequest._retry = true;
          axios
            .get("/auth/refresh", {
              baseURL: `${import.meta.env.VITE_BACKEND_URI}/api/v1`,
              headers: { Authorization: `Bearer ${refreshToken}` },
            })
            .then((res) => {
              setAuth(res.data);

              return this.instance(originalRequest);
            })
            .catch((err) => {
              clearAuth();
              window.location.href = "/";
              return Promise.reject(err);
            });
        }

        return Promise.reject(error);
      },
    );
  }

  public request<T>(config: AxiosRequestConfig<T>): Promise<T> {
    return this.instance.request(config);
  }

  public get = <T>(
    url: string,
    params: any = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => {
    const option: AxiosRequestConfig = {
      url,
      method: "GET",
      params,
      ...config,
    };
    return this.request(option);
  };

  public post = <T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => {
    const option: AxiosRequestConfig = { url, method: "POST", data, ...config };
    return this.request(option);
  };

  public put = <T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => {
    const option: AxiosRequestConfig = { url, method: "PUT", data, ...config };
    return this.request(option);
  };
  public patch = <T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => {
    const option: AxiosRequestConfig = {
      url,
      method: "PATCH",
      data,
      ...config,
    };
    return this.request(option);
  };
  public del = <T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => {
    const option: AxiosRequestConfig = {
      url,
      method: "DELETE",
      data,
      ...config,
    };
    return this.request(option);
  };
}

const { get, post, put, patch, del } = new NRequest(
  { baseURL: import.meta.env.VITE_BACKEND_URI },
  "/api",
);

export { get, post, put, patch, del };

export default NRequest;
