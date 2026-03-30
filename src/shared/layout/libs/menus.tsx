import { MdBarChart, MdDashboard, MdOutlinePayments } from "react-icons/md";
import {
  FaClipboardList,
  FaDollarSign,
  FaMoneyBillWave,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { PermissionsCode } from "@/shared/utils/menuPermissions";
import {
  BiChat,
  BiSolidBarChartAlt2,
  BiSolidGraduation,
  BiTrophy,
} from "react-icons/bi";
import { PiUsers } from "react-icons/pi";

import { SettingOutlined } from "@ant-design/icons";
export * from "./index.d";

export const getMenus = (t: (key: string) => string) => [
  {
    key: PermissionsCode.DASHBOARD.MENU,
    path: "/statistics",
    label: t("statistics"), // yoki "Boshqaruv paneli"
    icon: (isActive: boolean) => <BiSolidBarChartAlt2 size={26} />,
  },
  {
    key: "users",
    path: "/users/pupils",
    label: t("users"),
    icon: (isActive: boolean) => <PiUsers size={26} />,
  },
  {
    key: "mentor",
    path: "/mentors",
    label: t("teachers"),
    icon: () => <BiSolidGraduation size={22} />,
  },
  {
    key: "prices",
    label: t("prices"),
    icon: (isActive: boolean) => <FaDollarSign size={26} />,
    children: [
      {
        key: "subscriptionPlans",
        path: "/prices/subscriptionPlans",
        label: t("subscriptionPlans"),
        // icon: (isActive: boolean) => <FaMoneyBillWave size={18} />,
      },
      {
        key: "category",
        path: "/prices/category",
        label: t("category"),
        // icon: (isActive: boolean) => <FaClipboardList size={18} />,
      },
      {
        key: "benifits",
        path: "/prices/benifits",
        label: t("benifits"),
        // icon: (isActive: boolean) => <FaTags size={18} />,
      },
    ],
  },
  {
    key: "groups",
    path: "/groups/group",
    label: t("groups"),
    icon: () => <FaUsers size={22} />,
  },
  {
    key: "chats",
    path: "/chats",
    label: t("chat"),
    icon: () => <BiChat size={22} />,
  },
  {
    key: "ratings",
    path: "/ratings",
    label: t("ratings"),
    icon: (isActive: boolean) => <BiTrophy size={26} />,
  },
  {
    key: "payments",
    path: "/payments/payment",
    label: t("payments"),
    icon: () => <MdOutlinePayments size={22} />,
  },
  {
    key: "settings",
    label: t("settings"),
    icon: (isActive: boolean) => <SettingOutlined size={26} />,
    children: [
      {
        key: "annoucements",
        path: "/settings/annoucements",
        label: t("annoucements"),
      },
      {
        key: "motivation",
        path: "/settings/motivation",
        label: t("motivation"),
      },
      {
        key: "conversion",
        path: "/settings/conversion",
        label: t("conversion"),
      },
      {
        key: "daily-coin",
        path: "/settings/daily-coin",
        label: t("dailyCoin"),
      },
    ],
  },
];

// ✅ agar keys kerak bo‘lsa ham function bilan oling
export const getMenuKeys = (t: (key: string) => string) =>
  getMenus(t)
    .map((item) => item.key)
    .filter(Boolean);
