import axios from "axios";
import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getTokenAccessToken,
  getTokenRefreshToken,
  removeAuthData,
  saveAuthData,
} from "./auth";
import { BASE_URL } from "@/libs/env";

class AxiosConfig {
  protected instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: any[] = [];

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
        const token = getTokenAccessToken();
        if (config.headers && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private setupResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response.data,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = "Bearer " + token;
                return this.instance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }
          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = getTokenRefreshToken();

            const response = await axios.post(
              `${BASE_URL}/api/v1/auth/token/refresh/`,
              {
                refresh: refreshToken,
              },
            );
            const { accessToken } = response.data;
            saveAuthData(response.data);
            this.processQueue(null, accessToken);

            originalRequest.headers["Authorization"] = "Bearer " + accessToken;
            return this.instance(originalRequest);
          } catch (err: any) {
            this.processQueue(err, null);
            if (
              err?.response?.status === 401 ||
              err?.response?.status === 400
            ) {
              location.href = "/";
              removeAuthData();
            }
            return Promise.reject(err);
          } finally {
            this.isRefreshing = false;
          }
        }
        return Promise.reject(error?.response?.data || "Server Error");
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
  public delete = <T>(
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

const axiosApi = new AxiosConfig({ baseURL: BASE_URL + "/api/v1" }, "");

export { axiosApi };

export default AxiosConfig;
