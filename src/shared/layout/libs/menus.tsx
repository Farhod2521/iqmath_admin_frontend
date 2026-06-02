import {
  MdOutlineManageHistory,
  MdOutlinePayments,
  MdOutlineSubscriptions,
  MdOutlineWorkHistory,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { PermissionsCode } from "@/shared/utils/menuPermissions";
import {
  BiChat,
  BiSolidBarChartAlt2,
  BiSolidGraduation,
  BiTrophy,
} from "react-icons/bi";
import { PiUsers } from "react-icons/pi";
import { IoLibraryOutline, IoSettingsOutline } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";

// import { SettingOutlined } from "@ant-design/icons";
export * from "./index.d";

export const getMenus = (t: (key: string) => string) => [
  {
    key: PermissionsCode.DASHBOARD.MENU,
    path: "/statistics",
    label: t("statistics"), // yoki "Boshqaruv paneli"
    icon: (isActive: boolean) => <BiSolidBarChartAlt2 size={22} />,
  },
  {
    key: "users",
    path: "/users/pupils",
    label: t("users"),
    icon: (isActive: boolean) => <PiUsers size={22} />,
  },
  {
    key: "mentor",
    path: "/mentors",
    label: t("teachers"),
    icon: () => <BiSolidGraduation size={22} />,
  },
  {
    key: "subscriptions",
    path: "/subscriptions",
    label: t("subscriptions.title"),
    icon: (isActive: boolean) => <MdOutlineSubscriptions size={22} />,
  },
  {
    key: "library",
    label: t("library.title"),
    icon: (isActive: boolean) => <IoLibraryOutline size={22} />,
    children: [
      {
        key: "books",
        path: "/library/books",
        label: t("library.books"),
        // icon: (isActive: boolean) => <FaMoneyBillWave size={18} />,
      },
      {
        key: "book-categories",
        path: "/library/book-categories",
        label: t("library.categories"),
        // icon: (isActive: boolean) => <FaMoneyBillWave size={18} />,
      },
      {
        key: "book-tags",
        path: "/library/book-tags",
        label: t("library.tags"),
        // icon: (isActive: boolean) => <FaMoneyBillWave size={18} />,
      },
    ],
  },
  {
    key: "offline-orders",
    path: "/offline-orders",
    label: t("book.title"),
    icon: (isActive: boolean) => <GiNotebook size={22} />,
  },
  {
    key: "prices",
    label: t("prices"),
    icon: (isActive: boolean) => <FaDollarSign size={22} />,
    children: [
      {
        key: "subscriptionPlans",
        path: "/prices/subscriptionPlans",
        label: t("subscriptionPlans"),
        // icon: (isActive: boolean) => <FaMoneyBillWave size={18} />,
      },
      {
        key: "price-category",
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
      {
        key: "subscription-setting",
        path: "/prices/subscription-setting",
        label: t("subscription.title"),
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
  // {
  //   key: "chats",
  //   path: "/chats",
  //   label: t("chat"),
  //   icon: () => <BiChat size={22} />,
  // },
  {
    key: "ratings",
    path: "/ratings",
    label: t("ratings"),
    icon: (isActive: boolean) => <BiTrophy size={22} />,
  },
  {
    key: "payments",
    path: "/payments/payment",
    label: t("payments"),
    icon: () => <MdOutlinePayments size={22} />,
  },

  {
    key: "settings",
    label: t("appManagements"),
    icon: (isActive: boolean) => <IoSettingsOutline size={22} />,
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
      {
        key: "category",
        path: "/settings/category",
        label: t("category"),
      },
      {
        key: "products",
        path: "/settings/products",
        label: t("productsMenu.title"),
      },
      {
        key: "mathematicians",
        path: "/settings/mathematicians",
        label: t("mathematicians.title"),
      },
      {
        key: "referral-coupon-settings",
        path: "/settings/referral-coupon-settings",
        label: t("referralSettings.title"),
      },
      {
        key: "banners",
        path: "/settings/banner",
        label: t("banners.title"),
      },
      {
        key: "management-tags",
        path: "/settings/management-tags",
        label: t("tags.title"),
      },
      {
        key: "management-faqs",
        path: "/settings/management-faqs",
        label: t("faqs.title"),
      },
      {
        key: "upload-file-settings",
        path: "/settings/upload-file-settings",
        label: t("uploadFiles.title"),
      },
      {
        key: "upload-settings",
        path: "/settings/upload-settings",
        label: t("uploadSettings.title"),
      },
      {
        key: "solution-status",
        path: "/settings/solution-status",
        label: t("solutionStatus.title"),
      },
    ],
  },
  {
    key: "reward-log",
    path: "/reward-log",
    label: t("rewardLog"),
    icon: () => <MdOutlineWorkspacePremium size={22} />,
  },
  // /log-entries
  {
    key: "app-students",
    label: t("scoreLog.title"),
    path: "/app-students/score-log",
    icon: (isActive: boolean) => <MdOutlineManageHistory size={22} />,
    // children: [
    //   {
    //     key: "score-log",
    //     path: "/app-students/score-log",
    //     label: t("scoreLog.title"),
    //   },
    // ],
  },
  {
    key: "log-entries",
    path: "/log-entries",
    label: t("logEntries"),
    icon: () => <MdOutlineWorkHistory size={22} />,
  },
  // {
  //   key: "diagnostc",
  //   path: "/with-drawal",
  //   label: t("diagnostc"),
  //   icon: () => <MdOutlineWorkHistory size={22} />,
  // },
];

// ✅ agar keys kerak bo‘lsa ham function bilan oling
export const getMenuKeys = (t: (key: string) => string) =>
  getMenus(t)
    .map((item) => item.key)
    .filter(Boolean);
