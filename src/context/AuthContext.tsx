// context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";

interface User {
  id: number;
  name: string;
  login: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Sahifa yuklanganda tokenni tekshirish
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("access_token");

      console.log("LOG");
      if (!token) {
        setLoading(false);
        router.push("/login");
        return;
      }
      // Token bilan user ma'lumotlarini olish
      // const { data } = await apiClient.get("/api/auth/me");
      // setUser(data.user);
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("access_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (login: string, password: string) => {
    localStorage.setItem("access_token", "access_token");
    localStorage.setItem("refresh_token", "refresh_token");
    router.push("/dashboard"); // bu joyni olib tashlash kerak
    console.log("LOG");
    // try {
    //   const { data } = await apiClient.post("/api/auth/login", {
    //     login,
    //     password,
    //   });

    //   // Token va user ma'lumotlarini saqlash
    //   localStorage.setItem("access_token", data.access_token);

    //   if (data.refresh_token) {
    //     localStorage.setItem("refresh_token", data.refresh_token);
    //   }

    //   setUser(data.user);
    //   router.push("/dashboard");
    // } catch (error: any) {
    //   throw new Error(error.response?.data?.message || "Login failed");
    // }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
