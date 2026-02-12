import { selectedUserData, useStoreUsers } from "@/store";
import { useMemo } from "react";

export const usePermissions = () => {
  const userData = useStoreUsers(selectedUserData);
  const permissions: string[] = userData?.permissions || [];

  const has = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  const hasAny = (perms: string[]): boolean => {
    return perms.some((p) => permissions.includes(p));
  };

  const hasAll = (perms: string[]): boolean => {
    return perms.every((p) => permissions.includes(p));
  };

  return {
    permissions,
    has,
    hasAny,
    hasAll,
  };
};
