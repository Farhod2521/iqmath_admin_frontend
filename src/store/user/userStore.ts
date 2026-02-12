import { getAuthUserMe, getUserMe, UserMeData } from "@/services";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  userData: UserMeData | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;

  setUserData: (userData: UserMeData | null) => void;
  fetchUserData: () => Promise<UserMeData | null>;
}

export const useStoreUsers = create<UserState>()(
  devtools((set) => ({
    userData: null,
    isLoading: false,
    isError: false,
    errorMessage: null,
    setUserData: (userData) => set({ userData }),
    fetchUserData: async () => {
      set({
        isLoading: true,
        isError: false,
        errorMessage: null,
      });
      try {
        const res = await getAuthUserMe();
        set({ userData: res });
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Foydalanuvchi maʼlumotlarini olishda xatolik";

        set({
          isError: true,
          errorMessage: message,
        });

        return null;
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);

export const selectedSetUserData = (state: UserState) => state.setUserData;
export const selectedUserData = (state: UserState) => state.userData;
export const selectedFetchUserData = (state: UserState) => state.fetchUserData;
