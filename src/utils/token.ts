import { LoginResponseType } from "@/http";

export const USER_INFO = "@iqmathUserInfo";

export const setAuth = (data: LoginResponseType) =>
  localStorage.setItem(USER_INFO, JSON.stringify(data));
export const getAuth = () => {
  const info = localStorage.getItem(USER_INFO);
  return info ? JSON.parse(info) : "";
};
export const clearAuth = () => localStorage.clear();
export const getTokenRefresh = () => getAuth()?.refresh_token;
export const getTokenAccess = () => getAuth()?.access_token;
export const getIsStaff = () => getAuth()?.is_staff;
