import { Modal, Form, Input, Upload, Button, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ManagementMatematicianData } from "@/services";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any, file: File | null) => void;
  loading: boolean;
  initialValues?: ManagementMatematicianData | null;
};

const ModalMathematician = ({
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

  const handleFinish = async () => {
    const values = await form.validateFields();
    onSubmit(values, file);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleFinish}
      confirmLoading={loading}
      title={initialValues ? "Tahrirlash" : "Yangi matematik"}
      width={700}
    >
      {/* 🔥 preview */}
      {initialValues?.image && (
        <img
          src={initialValues.image}
          width={80}
          style={{ marginBottom: 10 }}
        />
      )}

      <Form form={form} layout="vertical">
        <Form.Item name="title_uz" label="Nomi UZ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="title_ru" label="Nomi RU" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="subtitle_uz" label="Subtitle UZ">
          <Input />
        </Form.Item>

        <Form.Item name="subtitle_ru" label="Subtitle RU">
          <Input />
        </Form.Item>

        <Form.Item name="life_years_uz" label="Yillar UZ">
          <Input />
        </Form.Item>

        <Form.Item name="life_years_ru" label="Yillar RU">
          <Input />
        </Form.Item>

        <Form.Item name="description_uz" label="Description UZ">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="description_ru" label="Description RU">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="is_active" label="Active" valuePropName="checked">
          <Switch />
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

export default ModalMathematician;
