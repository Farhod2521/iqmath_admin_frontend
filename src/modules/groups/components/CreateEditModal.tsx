// components/CreateEditModal.tsx
import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import SelectInfinite from "@/shared/components/selects/SelectInfinite";
import { getStudentList } from "@/services";
import { MyGroupsFormData, MyGroupsData } from "../utils/types";

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

  useEffect(() => {
    if (open && editing) {
      form.setFieldsValue({ name: editing.name, students: editing.students });
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
    getStudentList({ page, size, role: "student" });

  const getStudentOptions = (data: any) =>
    data?.results?.map((item: any) => ({
      label: item.full_name,
      value: Number(item.user_id),
    })) || [];
  const getStudentTotal = (data: any) => data?.total || 0;

  return (
    <Modal
      title={type === "edit" ? "Guruhni tahrirlash" : "Yangi guruh yaratish"}
      open={open}
      onOk={handleSubmit}
      okText="Saqlash"
      cancelText="Bekor qilish"
      okButtonProps={{ loading }}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nomi"
          name="name"
          rules={[{ required: true, message: "Guruh nomini kiriting" }]}
        >
          <Input placeholder="Masalan: 415-20 guruh" />
        </Form.Item>
        <Form.Item label="Yangi student qo‘shish" name="students">
          <SelectInfinite
            queryKey={getStudentQueryKey}
            queryFn={getStudentListFn}
            getOptions={getStudentOptions}
            getTotal={getStudentTotal}
            mode="multiple"
            allowClear
            placeholder="Student qidiring..."
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
