import { getManagementSystemSettings } from "@/services";
import { useThemeStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Brand = ({ color = false }: { color?: boolean }) => {
  const { collapsed, toggleCollapsed } = useThemeStore();

  return (
    <div className={"  "}>
      <button className="flex gap-x-1 items-center">
        <span className="mt-1">
          <img
            src={"https://api.iqmath.uz/system/logo/logo.png"}
            alt="brand"
            width={34}
            height={34}
            className={color ? "brightness-0 invert" : ""}
          />
        </span>
        {collapsed ? null : (
          <h1
            className={` font-normal text-[32px] font-bicubik ${color ? "text-white" : "text-gray-800"}  font-myriad  `}
          >
            MATH
          </h1>
        )}
      </button>
    </div>
  );
};

export default Brand;
