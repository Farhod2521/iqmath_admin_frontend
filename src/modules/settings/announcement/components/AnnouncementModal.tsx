import React, { useEffect } from "react";
import { Form, Input, Modal, Switch, Upload, message } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { AnnouncementData, AnnouncementFormData } from "@/services";
import { useTranslation } from "react-i18next";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface AnnouncementModalProps {
  open: boolean;
  editingItem: AnnouncementData | null;
  onCancel: () => void;
  onSubmit: (
    values: AnnouncementFormData,
    fileList: UploadFile[],
  ) => Promise<void>;
  confirmLoading: boolean;
  form: any;
  fileList: UploadFile[];
  onFileChange: (fileList: UploadFile[]) => void;
  onFileRemove: () => void;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  open,
  editingItem,
  onCancel,
  onSubmit,
  confirmLoading,
  form,
  fileList,
  onFileChange,
  onFileRemove,
}) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    onCancel();
  };

  const handleFileChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    onFileChange(newFileList);
  };

  const handleRemoveFile = () => {
    onFileRemove();
  };

  useEffect(() => {
    if (editingItem) {
      form.setFieldsValue({
        title_uz: editingItem.title_uz,
        title_ru: editingItem.title_ru,
        text_uz: editingItem.text_uz,
        text_ru: editingItem.text_ru,
        news_status: editingItem.news_status,
        notification_status: editingItem.notification_status,
        video: editingItem.video,
      });
    }
  }, [editingItem, form]);

  return (
    <Modal
      title={editingItem ? t("announcement.edit") : t("announcement.create")}
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText={editingItem ? t("save") : t("create")}
      confirmLoading={confirmLoading}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values: AnnouncementFormData) => onSubmit(values, fileList)}
      >
        {/* TITLE UZ */}
        <Form.Item
          label={t("announcement.title_uz")}
          name="title_uz"
          rules={[
            {
              required: true,
              message: t("announcement.title_uz"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* TITLE RU */}
        <Form.Item
          label={t("announcement.title_ru")}
          name="title_ru"
          rules={[
            {
              required: true,
              message: t("announcement.title_ru"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* TEXT UZ */}
        <Form.Item
          label={t("announcement.text_uz")}
          name="text_uz"
          rules={[
            {
              required: true,
              message: t("announcement.text_uz"),
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* TEXT RU */}
        <Form.Item
          label={t("announcement.text_ru")}
          name="text_ru"
          rules={[
            {
              required: true,
              message: t("announcement.text_ru"),
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* IMAGE */}
        <Form.Item label={t("announcement.image")} name="image">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            onRemove={handleRemoveFile}
            beforeUpload={(file) => {
              const isValid = ALLOWED_IMAGE_TYPES.includes(file.type);

              if (!isValid) {
                message.error(t("announcement.image_error"));
                return Upload.LIST_IGNORE;
              }

              return false;
            }}
            accept=".jpg,.jpeg,.png,.webp"
            maxCount={1}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <div>+ {t("announcement.upload")}</div>
                <div style={{ fontSize: 12, color: "#999" }}>
                  {t("announcement.image")}
                </div>
              </div>
            )}
          </Upload>

          {editingItem?.image && fileList.length === 0 && (
            <div style={{ marginTop: 8, color: "#999" }}>{t("noData")}</div>
          )}
        </Form.Item>

        {/* VIDEO */}
        <Form.Item label={t("announcement.video")} name="video">
          <Input placeholder="https://example.com/video.mp4" />
        </Form.Item>

        {/* NEWS STATUS */}
        <Form.Item
          label={t("announcement.news_status")}
          name="news_status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        {/* NOTIFICATION STATUS */}
        <Form.Item
          label={t("announcement.notification_status")}
          name="notification_status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AnnouncementModal;