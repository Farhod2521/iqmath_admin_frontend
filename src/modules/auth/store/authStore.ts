import { AUTH_DATA, AuthDataType } from "@/configs/auth";
import { getCookie } from "@/configs/cookies";
import { getUserMe, UserMeData } from "@/services";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  authData: AuthDataType | null;
  setAuth: (user: AuthDataType | null) => void;
  clearAuth: () => void;
}

export const useStoreAuth = create<UserState>()(
  devtools((set) => ({
    authData: getCookie(AUTH_DATA),
    setAuth: (authData) => set({ authData }),
    clearAuth: () => set({ authData: null }),
  })),
);

export const selectedSetAuth = (state: UserState) => state.setAuth;
export const selectedAuthData = (state: UserState) => state.authData;
export const selectedClearData = (state: UserState) => state.clearAuth;
