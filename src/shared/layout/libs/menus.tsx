import { MdBarChart, MdDashboard, MdOutlinePayments } from "react-icons/md";
import {
  FaClipboardList,
  FaDollarSign,
  FaMoneyBillWave,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { PermissionsCode } from "@/shared/utils/menuPermissions";
import { BiChat } from "react-icons/bi";
import { SettingOutlined } from "@ant-design/icons";
export * from "./index.d";

export const getMenus = (t: (key: string) => string) => [
  {
    key: PermissionsCode.DASHBOARD.MENU,
    path: "/dashboard",
    label: t("dashboard"), // yoki "Boshqaruv paneli"
    icon: MdDashboard,
  },
  {
    key: "mentor",
    path: "/mentors",
    label: t("mentor"),
    icon: () => <BiChat size={22} />,
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
        icon: (isActive: boolean) => <FaMoneyBillWave size={18} />,
      },
      {
        key: "category",
        path: "/prices/category",
        label: t("category"),
        icon: (isActive: boolean) => <FaClipboardList size={18} />,
      },
      {
        key: "benifits",
        path: "/prices/benifits",
        label: t("benifits"),
        icon: (isActive: boolean) => <FaTags size={18} />,
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
    key: "settings",
    label: t("settings"),
    icon: () => <SettingOutlined size={22} />,
    children: [
      {
        key: "settings",
        path: "/setting/coversion",
        label: t("coversion"),
      },
    ],
  },
  {
    key: "payments",
    path: "/payments/payment",
    label: t("payments"),
    icon: () => <MdOutlinePayments size={22} />,
  },
];

// ✅ agar keys kerak bo‘lsa ham function bilan oling
export const getMenuKeys = (t: (key: string) => string) =>
  getMenus(t)
    .map((item) => item.key)
    .filter(Boolean);





