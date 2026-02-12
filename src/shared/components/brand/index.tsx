import { getManagementSystemSettings } from "@/services";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Brand = ({ color = false }: { color?: boolean }) => {
  return (
    <div className={"  "}>
      <button className="flex gap-x-1 items-center">
        <img
          src={"https://api.iqmath.uz/system/logo/logo.png"}
          alt="brand"
          width={34}
          height={34}
          className={color ? "brightness-0 invert" : ""}
        />
        <h1
          className={` font-normal text-[32px] font-bicubik ${color ? "text-white" : "text-gray-800"}  font-myriad  `}
        >
          MATH
        </h1>
      </button>
    </div>
  );
};

export default Brand;
