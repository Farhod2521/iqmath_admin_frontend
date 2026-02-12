import {
  MdAccountBalance,
  MdBarChart,
  MdDashboard,
  MdGroup,
  MdMap,
  MdOutlinePayment,
  MdSecurity,
  MdWork,
} from "react-icons/md";
import { BsGlobeAsiaAustralia } from "react-icons/bs";
import { AiTwotoneMedicineBox } from "react-icons/ai";
import { AiOutlineBug } from "react-icons/ai";

import { IoMdSettings } from "react-icons/io";
import { PermissionsCode } from "@/shared/utils/menuPermissions";
export * from "./index.d";

const menus = [
  {
    key: PermissionsCode.DASHBOARD.MENU,
    path: "/dashboard",
    label: "Boshqaruv paneli",
    icon: MdDashboard,
  },
  {
    key: PermissionsCode.USERS.MENU,
    path: "/statistics",
    label: "Statistikalar",
    icon: MdBarChart,
  },
];

export default menus;
export const menuKeys = menus.map((item) => item.key).filter(Boolean);
