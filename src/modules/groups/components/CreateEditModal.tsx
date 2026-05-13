// components/CreateEditModal.tsx
import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import SelectInfinite from "@/shared/components/selects/SelectInfinite";
import { getStudentList } from "@/services";
import { MyGroupsFormData, MyGroupsData } from "../utils/types";
import { useTranslation } from "react-i18next";

interface CreateEditModalProps {
  open: boolean;
  type: "create" | "edit" | null;
  editing: MyGroupsData | null;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (values: MyGroupsFormData) => void;
}

export const CreateEditModal = ({
  open,
  type,
  editing,
  loading,
  onCancel,
  onSubmit,
}: CreateEditModalProps) => {
  const [form] = Form.useForm<MyGroupsFormData>();
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      if (editing) {
        form.setFieldsValue({
          name: editing.name,
          teacher_id: editing.teacher_id,
          students: editing.students,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, editing, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    onSubmit(values);
  };

  // Studentlar uchun memoized funksiyalar
  const getStudentQueryKey = (search: string) => [
    "new-students-without-group",
    search,
  ];

  const getStudentListFn = ({ page, size }: { page: number; size: number }) =>
    getStudentList({ page, size, role: "student", status: "active" });

  const getStudentOptions = (data: any) =>
    data?.results?.map((item: any) => ({
      label: item.full_name,
      value: Number(item.user_id),
    })) || [];
  const getStudentTotal = (data: any) => data?.total || 0;

  // Teacherlar uchun
  const getTeacherQueryKey = (search: string) => ["teachers-list", search];

  const getTeacherListFn = ({ page, size }: { page: number; size: number }) =>
    getStudentList({ page, size, role: "teacher", status: "active" }); //role o'zgardi

  const getTeacherOptions = (data: any) =>
    data?.results?.map((item: any) => ({
      label: item.full_name,
      value: Number(item.user_id),
    })) || [];

  const getTeacherTotal = (data: any) => data?.total || 0;

  return (
    <Modal
      title={type === "edit" ? t("groupEdit") : t("newGroupAdd")}
      open={open}
      onOk={handleSubmit}
      okText={t("save")}
      cancelText={t("cancel")}
      okButtonProps={{ loading }}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={t("groupName")}
          name="name"
          rules={[{ required: true, message: t("enterGroupName") }]}
        >
          <Input placeholder={t("forExampleGroup")} />
        </Form.Item>
        <Form.Item
          label={t("tutor")}
          name="teacher_id"
          rules={[{ required: true, message: t("chooseTutor") }]}
        >
          <SelectInfinite
            queryKey={getTeacherQueryKey}
            queryFn={getTeacherListFn}
            getOptions={getTeacherOptions}
            getTotal={getTeacherTotal}
            allowClear
            placeholder={t("tutors")}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label={t("selectStudents")} name="students">
          <SelectInfinite
            queryKey={getStudentQueryKey}
            queryFn={getStudentListFn}
            getOptions={getStudentOptions}
            getTotal={getStudentTotal}
            mode="multiple"
            allowClear
            placeholder={t("selectStudents")}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
