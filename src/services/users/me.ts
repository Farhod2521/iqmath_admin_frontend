import { axiosApi } from "@/configs/api";

type OrgRoleType = {
  code: string;
  id: number;
  name: string;
};

type LocationType = {
  soato: number;
  name: string;
};

export type UserMeData = {
  accessLevel: number;
  fullName: string;
  id: number;
  isChief: boolean;
  isSuperadmin: boolean;
  permissions: string[];
  organisation: OrgRoleType;
  pinfl: string;
  region: LocationType;
  district: LocationType;
  role: OrgRoleType;
  photo: string;
};

export const getUserMe = () => axiosApi.get<UserMeData>(`/users/me`);
export const getAuthUserMe = () =>
  axiosApi.get<UserMeData>(`/auth/student/profile/`);
