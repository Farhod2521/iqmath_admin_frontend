import { BooksData, getBooks } from "@/services";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Image,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

const Books = () => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["library-books"],
    queryFn: getBooks,
  });

  const columns = [
    {
      title: t("#"),
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: t("library.common.coverImage"),
      dataIndex: "cover_image",
      key: "cover_image",
      width: 150,
      render: (cover: string) => (
        <Image
          src={cover}
          width={50}
          height={60}
          fallback="https://via.placeholder.com/50x60?text=No+Image"
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: t("title"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("description"),

      dataIndex: "description",
      key: "description",
      width: 250,
      render: (text: string, record: BooksData) => (
        <div>
          {text?.length > 100 ? `${text.substring(0, 100)}...` : text || "---"}
          {text?.length > 100 && (
            <Button
              type="link"
              size="small"
              onClick={() => {
                Modal.info({
                  title: record.name,
                  content: <p>{text}</p>,
                  width: 500,
                });
              }}
            >
              {t("common.read_more")}
            </Button>
          )}
        </div>
      ),
    },
    {
      title: t("library.categories"),
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: t("library.tags"),
      dataIndex: "tags",
      key: "tags",
      width: 200,
      render: (tags: { id: number; name: string }[]) => (
        <Space size={[0, 4]} wrap>
          {tags?.map((tag) => (
            <Tag key={tag.id} color="processing">
              {tag.name}
            </Tag>
          ))}
          {(!tags || tags.length === 0) && "---"}
        </Space>
      ),
    },
    {
      title: t("library.common.file"),
      dataIndex: "file",
      key: "file",
      width: 120,
      render: (file: string) => (
        <Button
          type="link"
          onClick={() => window.open(file, "_blank")}
          icon={<UploadOutlined />}
        >
          {t("library.common.download")}
        </Button>
      ),
    },
    {
      title: t("price"),
      dataIndex: "price",
      key: "price",
      render: (price: string) => `${price} so'm`,
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? t("common.active") : t("common.inactive")}
        </Tag>
      ),
    },
    {
      title: t("createdAt"),
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (created_at: string) => formatDateColumn(created_at),
    },
    {
      title: t("updatedAt"),
      dataIndex: "updated_at",
      key: "updated_at",
      width: 150,
      render: (updated_at: string) => formatDateColumn(updated_at),
    },
    {
      title: t("actions"),
      key: "actions",
      width: 150,
      render: (_: any, record: BooksData) => (
        <Space>
          <Button
            variant="outlined"
            color="primary"
            // onClick={() => handleOpenModal(record)}
            icon={<EditOutlined />}
          />

          <Popconfirm
            title={t("delete_confirm")}
            // onConfirm={() => handleDelete(record.id)}
            okText={t("yes")}
            cancelText={t("no")}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <Card title={t("library.books")}>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data}
        loading={isLoading}
        scroll={{ x: 1500 }}
        pagination={false}
      />
    </Card>
  );
};

export default Books;
