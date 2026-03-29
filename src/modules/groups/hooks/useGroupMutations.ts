// hooks/useGroupMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  postMyGroups,
  putMyGroupDetail,
  deleteMyGroupDetail,
  postGroupAddStudent,
} from "../services";
import { handleApiError } from "@/shared/utils/handleApiError";
import { MyGroupsFormData } from "../utils/types";

const QUERY_KEY = ["data-groups"];

export const useCreateGroup = (onSuccess?: () => void) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postMyGroups,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: QUERY_KEY });
      onSuccess?.();
    },
    onError: (err) => handleApiError(err),
  });
};

export const useUpdateGroup = (onSuccess?: () => void) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<MyGroupsFormData>;
    }) => putMyGroupDetail(id, payload as any),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: QUERY_KEY });
      onSuccess?.();
    },
    onError: (err) => handleApiError(err),
  });
};

export const useDeleteGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMyGroupDetail(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: (err) => handleApiError(err),
  });
};

export const useAddStudents = (
  groupId: number | null,
  onSuccess?: () => void,
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ student_ids }: { student_ids: number[] }) =>
      postGroupAddStudent(groupId!, { student_ids }),
    onSuccess: async () => {
      message.success("Studentlar guruhga qo‘shildi ✅");

      await qc.invalidateQueries({ queryKey: ["data-groups-detail", groupId] });
      await qc.invalidateQueries({ queryKey: QUERY_KEY });
      await qc.invalidateQueries({ queryKey: ["new-students-without-group"] });

      onSuccess?.();
    },
    onError: (err) => handleApiError(err),
  });
};
