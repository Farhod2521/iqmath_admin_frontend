import { get, post } from "@/http/request";
import { getTokenRefresh } from "@/utils/token";

export type LoginResponseType = {
  access_token: string;
  refresh_token: string;
  is_staff: boolean;
  rever_access_token?: string;
};
export const getAuthLogIn = () => post("/auth/student/login");

export type AuthCallbackLogInFormData = {
  phone: string;
  password: string;
  remember?: boolean;
  redirect: boolean;
};

export type AuthCsrfData = {
  csrfToken: string;
};

export const getAuthProviders = () => get("/auth/providers");
export const getAuthCSRF = () => get<AuthCsrfData>("/auth/csrf");
export const postAuthCallbackLogIn = (data: URLSearchParams) =>
  post("/auth/callback/credentials", data);

//

export const getLoginCallBack = (code: string | null) =>
  get<LoginResponseType>(`/auth/oneid/callback`, { code });
export const getSapCallBack = (id: string | null) =>
  get<LoginResponseType>(`/auth/sap/callback`, { id });

export const getAuthLogOut = () => get("/auth/logout");
