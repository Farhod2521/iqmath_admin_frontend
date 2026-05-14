import { BASE_URL } from "@/libs/env";
import { BooksData, deleteBook, getBooks } from "@/services";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import { getStatusConfig } from "@/shared/utils/bookStatus";
import { handleApiError } from "@/shared/utils/handleApiError";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import BookFormModal from "../components/BookFormModal";

const Books = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BooksData | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<BooksData[]>({
    queryKey: ["library-books"],
    queryFn: () => getBooks({}),
  });

  // DELETE Mutation
  const deleteMutation = useMutation({
    mutationKey: ["deleteBook"],
    mutationFn: (id: number) => deleteBook(id),
    onSuccess: () => {
      toast.success(t("library.common.successDelete"));
      queryClient.invalidateQueries({ queryKey: ["library-books"] });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  const handleOpenModal = (book?: BooksData) => {
    if (book) {
      setEditingBook(book);
    } else {
      setEditingBook(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const columns: ColumnsType<BooksData> = [
    {
      title: t("#"),
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: t("library.common.coverImage"),
      dataIndex: "cover_image",
      key: "cover_image",
      width: 150,
      render: (cover_image: string) => (
        <Image
          src={BASE_URL + cover_image}
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
      render: (file: string, record: BooksData) => {
        if (record.is_offline) {
          return <Tag color="orange">{t("library.common.noFile")}</Tag>;
        }
        return (
          <Button
            type="link"
            onClick={() => window.open(BASE_URL + file, "_blank")}
            icon={<UploadOutlined />}
          >
            {t("library.common.download")}
          </Button>
        );
      },
    },
    {
      title: t("price"),
      dataIndex: "price",
      key: "price",
      render: (price: string) => `${price} so'm`,
    },
    {
      title: t("library.bookType"),
      dataIndex: "is_offline",
      key: "is_offline",
      render: (is_offline: boolean) => (
        <Tag color={is_offline ? "blue" : "green"}>
          {is_offline ? t("offline") : t("online")}
        </Tag>
      ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const { color, label } = getStatusConfig(status);
        return <Tag color={color}>{t(label)}</Tag>;
      },
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
            onClick={() => handleOpenModal(record)}
            icon={<EditOutlined />}
          />
          <Popconfirm
            title={t("deleteConfirm")}
            onConfirm={() => handleDelete(record.id)}
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
    <>
      <Card
        title={t("library.books")}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal()}
          >
            {t("adding")}
          </Button>
        }
      >
        <Table
          columns={columns}
          rowKey="id"
          dataSource={data}
          loading={isLoading}
          scroll={{ x: 1500 }}
          pagination={false}
        />
      </Card>

      <BookFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        editingBook={editingBook}
      />
    </>
  );
};

export default Books;
