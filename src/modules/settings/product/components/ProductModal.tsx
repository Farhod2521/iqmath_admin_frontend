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
      okText={t("productsMenu.modal.save")}
      cancelText={t("productsMenu.modal.cancel")}
      confirmLoading={loading}
      title={
        initialValues
          ? t("productsMenu.modal.editTitle")
          : t("productsMenu.modal.createTitle")
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name_uz"
          label={t("productsMenu.modal.nameUz")}
          rules={[
            { required: true, message: t("productsMenu.modal.nameUzRequired") },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name_ru"
          label={t("productsMenu.modal.nameRu")}
          rules={[
            { required: true, message: t("productsMenu.modal.nameRuRequired") },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="coin"
          label={t("productsMenu.modal.coin")}
          rules={[
            { required: true, message: t("productsMenu.modal.coinRequired") },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="count"
          label={t("productsMenu.modal.count")}
          rules={[
            { required: true, message: t("productsMenu.modal.countRequired") },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="image" label={t("productsMenu.modal.image")}>
          <SingleImageUpload />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
