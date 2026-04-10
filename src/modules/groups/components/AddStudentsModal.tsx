// components/AddStudentsModal.tsx
import { Modal } from "antd";
import { useState, useCallback } from "react";
import SelectInfinite from "@/shared/components/selects/SelectInfinite";
import { getStudentList } from "@/services";
import { useTranslation } from "react-i18next";

interface AddStudentsModalProps {
  open: boolean;
  groupId: number | null;
  selectedIds: number[];
  loading: boolean;
  onCancel: () => void;
  onSubmit: (studentIds: number[]) => void;
  onSelectionChange: (ids: number[]) => void;
}

export const AddStudentsModal = ({
  open,
  groupId,
  selectedIds,
  loading,
  onCancel,
  onSubmit,
  onSelectionChange,
}: AddStudentsModalProps) => {
  const { t } = useTranslation();
  // Studentlar uchun memoized funksiyalar
  const getStudentQueryKey = useCallback(
    (search: string) => ["new-students-without-group", search],
    [],
  );

  const getStudentListFn = useCallback(
    ({ page, size }: { page: number; size: number }) =>
      getStudentList({ page, size, role: "student" }),
    [],
  );

  const getStudentOptions = useCallback(
    (data: any) =>
      data?.results?.map((item: any) => ({
        label: item.full_name,
        value: item.user_id,
      })) || [],
    [],
  );

  const getStudentTotal = useCallback((data: any) => data?.total || 0, []);

  const handleSubmit = () => {
    onSubmit(selectedIds);
  };

  return (
    <Modal
      title={t("groupAddStudents")}
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={`${t("adding")} (${selectedIds.length})`}
      okButtonProps={{
        loading,
        disabled: selectedIds.length === 0,
      }}
      width={800}
    >
      {open && (
        <SelectInfinite
          queryKey={getStudentQueryKey}
          queryFn={getStudentListFn}
          getOptions={getStudentOptions}
          getTotal={getStudentTotal}
          value={selectedIds}
          onChange={(vals) => onSelectionChange(vals as number[])}
          mode="multiple"
          allowClear
          placeholder={t("selectStudents")}
          style={{ width: "100%" }}
        />
      )}

      <div style={{ marginTop: 8, color: "#999", fontSize: 12 }}>
        {t("scrollDow")}
      </div>
    </Modal>
  );
};
