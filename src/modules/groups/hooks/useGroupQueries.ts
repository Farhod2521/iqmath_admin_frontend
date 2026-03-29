// hooks/useGroupQueries.ts
import { useQuery } from "@tanstack/react-query";
import { getMyGroups, getMyGroupDetail } from "../services";
import { getNewStudents } from "@/services";

const QUERY_KEY = ["data-groups"];

export const useGroupsList = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getMyGroups,
  });
};

export const useGroupDetail = (groupId: number | null, enabled: boolean) => {
  return useQuery({
    queryKey: ["data-groups-detail", groupId],
    queryFn: () => getMyGroupDetail(String(groupId)),
    enabled: !!groupId && enabled,
  });
};

export const useNewStudents = (enabled: boolean) => {
  return useQuery({
    queryKey: ["new-students-without-group"],
    queryFn: getNewStudents,
    enabled,
  });
};
