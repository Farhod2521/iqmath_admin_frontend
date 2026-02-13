import { MdBarChart, MdDashboard } from "react-icons/md";
import {
  FaClipboardList,
  FaDollarSign,
  FaMoneyBillWave,
  FaTags,
} from "react-icons/fa";
import { PermissionsCode } from "@/shared/utils/menuPermissions";
export * from "./index.d";

export const getMenus = (t: (key: string) => string) => [
  {
    key: PermissionsCode.DASHBOARD.MENU,
    path: "/dashboard",
    label: t("dashboard"), // yoki "Boshqaruv paneli"
    icon: MdDashboard,
  },
  {
    key: PermissionsCode.USERS.MENU,
    path: "/statistics",
    label: t("statistics"),
    icon: MdBarChart,
  },
  {
    key: "prices",
    label: t("prices"),
    icon: (isActive: boolean) => (
      <FaDollarSign
        className={
          isActive
            ? "text-white"
            : "text-[#5d87ff] group-hover:text-white transition-colors duration-300"
        }
        size={26}
      />
    ),
    children: [
      {
        key: "subscriptionPlans",
        path: "/prices/subscriptionPlans",
        label: t("subscriptionPlans"),
        icon: (isActive: boolean) => (
          <FaMoneyBillWave
            className={
              isActive
                ? "text-white"
                : "text-[#5d87ff] group-hover:text-white transition-colors duration-300"
            }
            size={18}
          />
        ),
      },
      {
        key: "category",
        path: "/prices/category",
        label: t("category"),
        icon: (isActive: boolean) => (
          <FaClipboardList
            className={
              isActive
                ? "text-white"
                : "text-[#5d87ff] group-hover:text-white transition-colors duration-300"
            }
            size={18}
          />
        ),
      },
      {
        key: "benifits",
        path: "/prices/benifits",
        label: t("benifits"),
        icon: (isActive: boolean) => (
          <FaTags
            className={
              isActive
                ? "text-white"
                : "text-[#5d87ff] group-hover:text-white transition-colors duration-300"
            }
            size={18}
          />
        ),
      },
    ],
  },
];

// ✅ agar keys kerak bo‘lsa ham function bilan oling
export const getMenuKeys = (t: (key: string) => string) =>
  getMenus(t)
    .map((item) => item.key)
    .filter(Boolean);
