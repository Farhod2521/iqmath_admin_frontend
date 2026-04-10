import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SingleImageUpload from "@/shared/components/image/SingleImageUpload";

const ModalBanner = ({
  open,
  onClose,
  onSubmit,
  loading,
  initialValues,
}: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

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
      confirmLoading={loading}
      okText={t("banners.modal.save")}
      cancelText={t("banners.modal.cancel")}
      title={
        initialValues
          ? t("banners.modal.editTitle")
          : t("banners.modal.createTitle")
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item name="desc" label={t("banners.modal.description")}>
          <Input />
        </Form.Item>

        <Form.Item name="image" label={t("banners.modal.image")}>
          <SingleImageUpload />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalBanner;
