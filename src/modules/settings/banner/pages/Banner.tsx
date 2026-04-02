import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Upload,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getManagementBanners,
  postManagementBanner,
  putManagementBanner,
  deleteManagementBanner,
  ManagementBannerData,
} from "@/services";
import { useState, useEffect } from "react";
import { handleApiError } from "@/shared/utils/handleApiError";
import { toast } from "react-toastify";
import ModalBanner from "../components/ModalBanner";

const Banners = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<ManagementBannerData | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // 🔥 GET
  const { data, isLoading, error } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await getManagementBanners();
      return res;
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // 🔥 CREATE
  const createMutation = useMutation({
    mutationFn: postManagementBanner,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      closeModal();
    },
    onError: (e) => handleApiError(e),
  });

  // 🔥 UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => putManagementBanner(id, data),
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      closeModal();
    },
    onError: (e) => handleApiError(e),
  });

  // 🔥 DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteManagementBanner,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: (e) => handleApiError(e),
  });

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setEditData(null);
    setFile(null);
    form.resetFields();
  };

  // 🔥 EDIT
  const handleEdit = (record: ManagementBannerData) => {
    setEditData(record);
    form.setFieldsValue(record);
    openModal();
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    const values = await form.validateFields();

    const payload: any = { ...values };

    if (file) {
      payload.image = file;
    } else {
      delete payload.image;
    }

    if (editData) {
      await updateMutation.mutateAsync({
        id: editData.id,
        data: payload,
      });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  // 🔥 TABLE
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
      title: "Rasm",
      render: (_: any, record: ManagementBannerData) => (
        <img src={record.image} width={100} style={{ borderRadius: 6 }} />
      ),
    },
    {
      title: "Tavsif",
      dataIndex: "desc",
      render: (val: string) => val || "-",
    },
    {
      title: "Amal",
      width: "10px",
      render: (_: any, record: ManagementBannerData) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>
            <FaEdit />
          </Button>

          <Popconfirm
            title="O'chirishni tasdiqlaysizmi?"
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Bannerlar"
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

      <ModalBanner
        open={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
        initialValues={editData}
      />
    </Card>
  );
};

export default Banners;
