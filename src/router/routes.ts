import { lazy } from "react";
import { router } from "./index.d";
import menuRoutes from "./utils/menuRoutes";
import menus from "./libs/menus";

export { menus };
export const childRoutes = menuRoutes(menus);

const privaterouters = [
  {
    path: "/application/create",
    name: "create:property",
    component: lazy(() => import("@/home/pages/main/Main")),
  },
];

const publicrouters = [
  {
    path: "/",
    name: "login",
    component: lazy(() => import("@/pages/login")),
  },
  {
    path: "*",
    name: "404",
    component: lazy(() => import("@/pages/404/index")),
  },
];

export const publicPermissions = publicrouters.map((i) => i.name);

const routes: Array<router> = [
  ...publicrouters,
  {
    path: "/",
    name: "layout",
    component: lazy(() => import("@/layout/Layout")),
    children: [...(childRoutes as any), ...privaterouters],
  },
];

export default routes;
