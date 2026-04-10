import {
  AnnouncementData,
  AnnouncementFormData,
  deleteAnnouncements,
  getAnnouncements,
  postAnnouncements,
  putAnnouncements,
} from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Popconfirm,
  Space,
  Table,
  Tag,
  Image,
  message,
  Form,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { UploadFile } from "antd/es/upload/interface";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { RcFile } from "antd/es/upload";

import { BASE_URL } from "@/libs/env";
import AnnouncementModal from "../components/AnnouncementModal";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import { FaEdit } from "react-icons/fa";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

const Announcements = () => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AnnouncementData | null>(null);
  const [form] = Form.useForm<AnnouncementFormData>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["announcements-data"],
    queryFn: getAnnouncements,
  });

  const createMutation = useMutation({
    mutationFn: postAnnouncements,
    onSuccess: () => {
      message.success("E'lon yaratildi");
      setOpen(false);
      form.resetFields();
      setFileList([]);
      queryClient.invalidateQueries({ queryKey: ["announcements-data"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: AnnouncementFormData;
    }) => putAnnouncements(id, payload),
    onSuccess: () => {
      message.success("E'lon yangilandi");
      setOpen(false);
      setEditingItem(null);
      form.resetFields();
      setFileList([]);
      queryClient.invalidateQueries({ queryKey: ["announcements-data"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAnnouncements,
    onSuccess: () => {
      message.success("E'lon o'chirildi");
      queryClient.invalidateQueries({ queryKey: ["announcements-data"] });
    },
  });

  const handleCreate = () => {
    setEditingItem(null);
    setFileList([]);
    form.resetFields();
    form.setFieldsValue({
      title_uz: "",
      title_ru: "",
      text_uz: "",
      text_ru: "",
      news_status: false,
      notification_status: true,
      image: null,
      video: null,
    });
    setOpen(true);
  };

  const handleEdit = (record: AnnouncementData) => {
    setEditingItem(record);

    // Mavjud rasm URL bo'lsa, fileList ga qo'shamiz
    if (record.image) {
      // URL to'liq bo'lmasa, base URL bilan to'ldiramiz
      const imageUrl = record.image.startsWith("http")
        ? record.image
        : `${BASE_URL}${record.image}`;

      setFileList([
        {
          uid: "-1",
          name: "image.jpg",
          status: "done",
          url: imageUrl,
        },
      ]);
    } else {
      setFileList([]);
    }

    setOpen(true);
  };

  const handleSubmit = async (
    values: AnnouncementFormData,
    fileList: UploadFile[],
  ) => {
    try {
      // Rasmni formdata ga o'girish
      const formData = new FormData();

      // Matn maydonlari
      formData.append("title_uz", values.title_uz);
      formData.append("title_ru", values.title_ru);
      formData.append("text_uz", values.text_uz);
      formData.append("text_ru", values.text_ru);

      // Boolean qiymatlar
      formData.append("news_status", String(values.news_status));
      formData.append(
        "notification_status",
        String(values.notification_status),
      );

      // Video (agar mavjud bo'lsa)
      if (values.video) {
        formData.append("video", values.video);
      }

      // Rasmni tekshirish
      if (fileList.length > 0) {
        const file = fileList[0];

        // Agar yangi fayl tanlangan bo'lsa (originFileObj mavjud)
        if (file.originFileObj) {
          formData.append("image", file.originFileObj as RcFile);
        }
        // Agar eski rasm URL saqlanayotgan bo'lsa va u o'zgartirilmagan bo'lsa
        else if (editingItem?.image && file.url) {
          // URL ni yuborish shart emas, backend eski rasmni saqlab qoladi
          console.log("Rasm o'zgartirilmadi");
        }
      } else if (editingItem?.image && fileList.length === 0) {
        // Rasm o'chirilgan bo'lsa (fileList bo'sh)
        formData.append("image", "");
      }

      if (editingItem) {
        updateMutation.mutate({ id: editingItem.id, payload: formData as any });
      } else {
        createMutation.mutate(formData as any);
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setEditingItem(null);
    setFileList([]);
    form.resetFields();
  };

  const handleFileChange = (newFileList: UploadFile[]) => {
    setFileList(newFileList);
  };

  const handleFileRemove = () => {
    setFileList([]);
    form.setFieldValue("image", null);
  };

  // Rasm URL ni to'liq qilish uchun funksiya
  const getFullImageUrl = (imagePath: string | null): string | null => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `${BASE_URL}${imagePath}`;
  };

  const columns: ColumnsType<AnnouncementData> = useMemo(
    () => [
      {
        title: t("scoreLog.tR"),
        dataIndex: "id",
        key: "id",
        width: 70,
        render: (text: string, record: any, index: number) => (
          <span>{index + 1}</span>
        ),
      },
      {
        title:
          i18n.language === "uz"
            ? t("announcement.title_uz")
            : t("announcement.title_ru"),
        dataIndex: i18n.language === "uz" ? "title_uz" : "title_ru",
        key: "title",
        ellipsis: true,
      },
      {
        title:
          i18n.language === "uz"
            ? t("announcement.text_uz")
            : t("announcement.text_ru"),
        dataIndex: i18n.language === "uz" ? "text_uz" : "text_ru",
        key: "text",
        ellipsis: true,
      },
      {
        title: t("announcement.image"),
        dataIndex: "image",
        key: "image",
        width: 100,
        render: (value: string | null) => {
          if (!value) return "-";
          const fullUrl = getFullImageUrl(value);
          return (
            <Image
              src={fullUrl || ""}
              alt="preview"
              width={50}
              height={50}
              style={{ objectFit: "cover", borderRadius: 4 }}
              preview={{
                src: fullUrl || "",
              }}
              fallback="https://via.placeholder.com/50"
            />
          );
        },
      },
      {
        title: t("new"),
        dataIndex: "news_status",
        key: "news_status",
        width: 100,
        render: (value: boolean) =>
          value ? <Tag color="blue">Ha</Tag> : <Tag>Yo'q</Tag>,
      },
      {
        title: t("announcement.created"),
        dataIndex: "created_at",
        key: "created_at",
        width: 180,
        render: (val: string) => formatDateColumn(val),
      },
      {
        title: t("announcement.updated"),
        dataIndex: "updated_at",
        key: "updated_at",
        width: 180,
        render: (val: string) => formatDateColumn(val),
      },
      {
        title: t("actions"),
        key: "actions",
        width: 100,
        render: (_, record) => (
          <Space>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleEdit(record)}
            >
              <FaEdit />
            </Button>

            <Popconfirm
              title={t("announcement.delete_confirm")}
              okText={t("yes")}
              cancelText={t("no")}
              onConfirm={() => deleteMutation.mutate(record.id)}
            >
              <Button danger size="small" loading={deleteMutation.isPending}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [i18n.language, deleteMutation.isPending],
  );

  return (
    <Card
      title={t("announcement.title")}
      extra={
        <Button type="primary" onClick={handleCreate}>
          <PlusCircleOutlined /> {t("announcement.create")}
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data}
        columns={columns}
        scroll={{ x: 900 }}
      />

      <AnnouncementModal
        open={open}
        editingItem={editingItem}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        form={form}
        fileList={fileList}
        onFileChange={handleFileChange}
        onFileRemove={handleFileRemove}
      />
    </Card>
  );
};

export default Announcements;
