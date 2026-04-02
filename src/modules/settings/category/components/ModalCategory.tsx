import { Form, Input, Modal } from "antd";
import React from "react";

type Props = {
  form: any;
  handleSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
  dataId: number | undefined;
};

const ModalCategory = ({
  form,
  handleSubmit,
  isOpen,
  dataId,
  onClose,
}: Props) => {
  const title = dataId ? "Kategoriyani o'zgartirish" : "Kategoriyani yangilash";

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleSubmit}
      okText="Saqlash"
      cancelText="Bekor qilish"
      onCancel={onClose}
    >
      <Form form={form}>
        <Form.Item
          name="title"
          label="Nomi"
          rules={[{ required: true, message: "Nomini kiriting" }]}
        >
          <Input placeholder="Nomi" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCategory;
