import { Modal, Form, Input, Upload, Button, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ManagementMatematicianData } from "@/services";
import { useEffect, useState } from "react";
import SingleImageUpload from "@/shared/components/image/SingleImageUpload";
import { useTranslation } from "react-i18next";

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

  const handleFinish = async () => {
    const values = await form.validateFields();
      const fileList = values.image || [];
      const file = fileList[0]?.originFileObj || null;

    onSubmit(values, file);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleFinish}
      confirmLoading={loading}
      okText={t("save")}
      cancelText={t("cancel")}
      title={
        initialValues
          ? t("mathematicians.modal.editTitle")
          : t("mathematicians.modal.createTitle")
      }
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title_uz"
          label={t("mathematicians.modal.nameUz")}
          rules={[
            {
              required: true,
              message: t("mathematicians.modal.nameUzRequired"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="title_ru"
          label={t("mathematicians.modal.nameRu")}
          rules={[
            {
              required: true,
              message: t("mathematicians.modal.nameRuRequired"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="subtitle_uz"
          label={t("mathematicians.modal.subtitleUz")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="subtitle_ru"
          label={t("mathematicians.modal.subtitleRu")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="life_years_uz"
          label={t("mathematicians.modal.yearsUz")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="life_years_ru"
          label={t("mathematicians.modal.yearsRu")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description_uz"
          label={t("mathematicians.modal.descriptionUz")}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="description_ru"
          label={t("mathematicians.modal.descriptionRu")}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="is_active"
          label={t("mathematicians.modal.active")}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item name="image" label={t("mathematicians.modal.image")}>
          <SingleImageUpload />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalMathematician;
