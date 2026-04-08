import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ManagementBannerData } from "@/services";
import { useTranslation } from "react-i18next";
import SingleImageUpload from "@/shared/components/image/SingleImageUpload";

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
      okText={t("save")}
      cancelText={t("cancel")}
      title={initialValues ? "Tahrirlash" : "Yangi banner"}
    >
      {/* {initialValues?.image && (
        <img
          src={initialValues.image}
          width={120}
          style={{ marginBottom: 10, borderRadius: 6 }}
        />
      )} */}

      <Form form={form} layout="vertical">
        <Form.Item name="desc" label="Tavsif">
          <Input />
        </Form.Item>

        <Form.Item name="image" label="Rasm" valuePropName="value">
          <SingleImageUpload />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalBanner;
