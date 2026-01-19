"use client";

import CardBox from "../shared/CardBox";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState({ login: "", password: "" });
  const handleLogin = () => {
    login(user.login, user.password);
    router.push("/dashboard");
  };
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-lightprimary">
        <div className="md:min-w-[450px] min-w-max">
          <CardBox>
            <div className="flex justify-center text-2xl mb-4">
              Iqmath admin
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username1" className="font-medium">
                  Username
                </Label>
              </div>
              <Input
                id="username1"
                type="text"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" className="font-medium">
                  Password
                </Label>
              </div>
              <Input
                id="password1"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex flex-wrap gap-6 items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label
                  className="text-link font-normal text-sm"
                  htmlFor="remember"
                >
                  Remember this device
                </Label>
              </div>
              <Link
                href="#"
                className="text-sm font-medium text-primary hover:text-primaryemphasis"
              >
                Forgot Password ?
              </Link>
            </div>
            <Button className="w-full rounded-full" onClick={handleLogin}>
              Kirish
            </Button>
          </CardBox>
        </div>
      </div>
    </>
  );
};
