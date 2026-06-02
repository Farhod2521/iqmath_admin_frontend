import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getMenus, MenuItem } from "@/shared/layout/libs/menus";
import { useTranslation } from "react-i18next";
import { buildBreadcrumbsFromMenu } from "../utils/buildBreadcrumbsFromMenu";

export const useBreadcrumbs = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const menus = useMemo(() => getMenus(t), [i18n.language]);

  return useMemo(() => {
    return buildBreadcrumbsFromMenu(menus as any, location.pathname, t);
  }, [menus, location.pathname]);
};
