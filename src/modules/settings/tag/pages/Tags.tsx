import { Button, Card, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getManagementTags,
  postManagementTag,
  putManagementTag,
  deleteManagementTag,
  ManagementTagData,
} from "@/services";
import { useState, useEffect } from "react";
import { handleApiError } from "@/shared/utils/handleApiError";
import ModalTag from "../components/ModalTag";
import { toast } from "react-toastify";

const Tags = () => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<ManagementTagData | null>(null);

  // GET
  const { data, isLoading, error } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await getManagementTags();
      return res;
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // CREATE
  const createMutation = useMutation({
    mutationFn: postManagementTag,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      closeModal();
    },
    onError: (e) => handleApiError(e),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => putManagementTag(id, data),
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      closeModal();
    },
    onError: (e) => handleApiError(e),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteManagementTag,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (e) => handleApiError(e),
  });

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setEditData(null);
  };

  const handleEdit = (record: ManagementTagData) => {
    setEditData(record);
    openModal();
  };

  // SUBMIT
  const handleSubmit = async (values: any) => {
    if (editData) {
      await updateMutation.mutateAsync({
        id: editData.id,
        data: values,
      });
    } else {
      await createMutation.mutateAsync(values);
    }
  };

  const columns = [
    {
      title: "T/r",
      dataIndex: "id",
      key: "id",
      width: "10px",
      render: (text: string, record: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: "Tag nomi",
      dataIndex: "title",
    },
    {
      title: "Amal",
      width: "10px",
      render: (_: any, record: ManagementTagData) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>
            <FaEdit />
          </Button>

          <Popconfirm
            title="O'chirishni tasdiqlaysizmi?"
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Taglar"
      extra={
        <Button type="primary" onClick={openModal}>
          Qo‘shish
        </Button>
      }
    >
      <Table
        rowKey="id"
        dataSource={data || []}
        loading={isLoading}
        columns={columns}
        pagination={false}
        scroll={{ x: 600 }}
      />

      <ModalTag
        open={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
        initialValues={editData}
      />
    </Card>
  );
};

export default Tags;
