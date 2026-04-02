import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import { ManagementTagData } from "@/services";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  loading: boolean;
  initialValues?: ManagementTagData | null;
};

const ModalTag = ({
  open,
  onClose,
  onSubmit,
  loading,
  initialValues,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    onSubmit(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      title={initialValues ? "Tahrirlash" : "Yangi tag"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Tag nomi"
          rules={[{ required: true, message: "Tag nomini kiriting" }]}
        >
          <Input placeholder="Masalan: Matematika" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalTag;
