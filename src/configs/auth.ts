import { getCookie, removeCookie, setCookie } from "./cookies";

export const AUTH_DATA = "@iqmathdata";

export type AuthDataType = {
  access_token: string;
  expires_in: number;
  full_name: string;
  id: number;
  phone: string;
  refresh_token: string;
  role: string;
  status: boolean;
};

export const getAuthData = (): AuthDataType => {
  return getCookie(AUTH_DATA);
};

export const saveAuthData = (authData: AuthDataType) => {
  setCookie(AUTH_DATA, authData);
};

export const getTokenAccessToken = () => {
  return getAuthData().access_token;
};
export const getTokenRefreshToken = () => {
  return getAuthData().refresh_token;
};
export const removeAuthData = () => {
  removeCookie(AUTH_DATA);
};
