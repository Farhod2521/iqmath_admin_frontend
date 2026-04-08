import { Modal, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";
import SingleImageUpload from "@/shared/components/image/SingleImageUpload";
import { ManagementProductData } from "@/services";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any, file: File | null) => void;
  loading: boolean;
  initialValues?: ManagementProductData | null;
};

const ProductModal = ({
  open,
  onClose,
  onSubmit,
  loading,
  initialValues,
}: Props) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        image: initialValues.image
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: initialValues.image,
              },
            ]
          : [],
      });
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const fileList = values.image || [];
    const file = fileList[0]?.originFileObj || null;

    onSubmit(values, file);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={t("save")}
      cancelText={t("cancel")}
      confirmLoading={loading}
      title={initialValues ? "Tahrirlash" : "Yangi mahsulot"}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name_uz" label="Nomi UZ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="name_ru" label="Nomi RU" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="coin"
          label="Kerakli tanga"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="count"
          label="Mahsulot soni"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="image" label="Rasm" valuePropName="value">
          <SingleImageUpload />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
