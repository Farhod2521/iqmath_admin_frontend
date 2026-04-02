import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ManagementBannerData } from "@/services";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any, file: File | null) => void;
  loading: boolean;
  initialValues?: ManagementBannerData | null;
};

const ModalBanner = ({
  open,
  onClose,
  onSubmit,
  loading,
  initialValues,
}: Props) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    onSubmit(values, file);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      title={initialValues ? "Tahrirlash" : "Yangi banner"}
    >
      {/* 🔥 preview */}
      {initialValues?.image && (
        <img
          src={initialValues.image}
          width={120}
          style={{ marginBottom: 10, borderRadius: 6 }}
        />
      )}

      <Form form={form} layout="vertical">
        <Form.Item name="desc" label="Tavsif">
          <Input />
        </Form.Item>

        <Form.Item label="Rasm">
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Rasm yuklash</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalBanner;
