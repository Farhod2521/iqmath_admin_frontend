import React, { useEffect } from "react";
import { Form, Input, Modal, Switch, Upload, message } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import { AnnouncementData, AnnouncementFormData } from "@/services";
import { BASE_URL } from "@/libs/env";

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
  form: any; // Form instance
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
  // Modal yopilganda formani tozalash
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

  // Formani boshlang'ich qiymatlar bilan to'ldirish
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
      title={editingItem ? "E'lonni tahrirlash" : "Yangi e'lon"}
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText={editingItem ? "Saqlash" : "Yaratish"}
      confirmLoading={confirmLoading}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values: AnnouncementFormData) => onSubmit(values, fileList)}
      >
        <Form.Item
          label="Sarlavha UZ"
          name="title_uz"
          rules={[{ required: true, message: "Sarlavha kiriting" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Sarlavha RU"
          name="title_ru"
          rules={[{ required: true, message: "Sarlavha kiriting" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Matn UZ"
          name="text_uz"
          rules={[{ required: true, message: "Matn kiriting" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Matn RU"
          name="text_ru"
          rules={[{ required: true, message: "Matn kiriting" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Rasm" name="image">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            onRemove={handleRemoveFile}
            beforeUpload={(file) => {
              const isValid = ALLOWED_IMAGE_TYPES.includes(file.type);
              if (!isValid) {
                message.error(
                  "Faqat jpg, jpeg, png yoki webp rasm yuklash mumkin",
                );
                return Upload.LIST_IGNORE;
              }

              // Yuklashni to'xtatamiz (keyin formData orqali yuboramiz)
              return false;
            }}
            accept=".jpg,.jpeg,.png,.webp"
            maxCount={1}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <div>+ Yuklash</div>
                <div style={{ fontSize: 12, color: "#999" }}>Rasm</div>
              </div>
            )}
          </Upload>
          {editingItem?.image && fileList.length === 0 && (
            <div style={{ marginTop: 8, color: "#999" }}>Rasm mavjud emas</div>
          )}
        </Form.Item>

        <Form.Item label="Video (URL)" name="video">
          <Input placeholder="https://example.com/video.mp4" />
        </Form.Item>

        <Form.Item
          label="News status"
          name="news_status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Notification status"
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
