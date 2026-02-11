import { lazy } from "react";
import { AppstoreOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export default [
  {
    path: "/dashboard",
    key: "menu:dashboard",
    label: "Dashboard",

    icon: AppstoreOutlined,
    component: lazy(() => import("@/pages/dashboard/Dashboard")),
  },
];
