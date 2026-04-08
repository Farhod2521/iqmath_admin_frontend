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
  Switch,
  Tag,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getManagementMatematicians,
  postManagementMatematician,
  putManagementMatematician,
  deleteManagementMatematician,
  ManagementMatematicianData,
} from "@/services";
import { useState, useEffect } from "react";
import { handleApiError } from "@/shared/utils/handleApiError";
import ModalMathematician from "../components/ModalMathematician";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Mathematicians = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<ManagementMatematicianData | null>(
    null,
  );

  // GET
  const { data, isLoading, error } = useQuery({
    queryKey: ["mathematicians"],
    queryFn: async () => {
      const res = await getManagementMatematicians();
      return res;
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // CREATE
  const createMutation = useMutation({
    mutationFn: postManagementMatematician,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["mathematicians"] });
      closeModal();
    },
    onError: (e) => handleApiError(e),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => putManagementMatematician(id, data),
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["mathematicians"] });
      closeModal();
    },
    onError: (e) => handleApiError(e),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteManagementMatematician,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["mathematicians"] });
    },
    onError: (e) => handleApiError(e),
  });

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setEditData(null);
    form.resetFields();
  };

  // EDIT
  const handleEdit = (record: ManagementMatematicianData) => {
    setEditData(record);
    form.setFieldsValue(record);
    openModal();
  };

  // SUBMIT
  const handleSubmit = async (values: any, file: File | null) => {
    // const values = await form.validateFields();

    const payload = {
      ...values,
      image: file || values.image, // muhim
    };

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

  // TABLE
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
    { title: "Nomi (UZ)", dataIndex: "title_uz" },
    { title: "Nomi (RU)", dataIndex: "title_ru" },
    { title: "Yillar", dataIndex: "life_years_uz" },

    {
      title: "Rasm",
      render: (_: any, record: ManagementMatematicianData) => (
        <img src={record.image} width={50} />
      ),
    },
    {
      title: t("active"),
      render: (_: any, record: ManagementMatematicianData) =>
        record.is_active ? (
          <Tag color="green">Faol</Tag>
        ) : (
          <Tag color="red">Faol emas</Tag>
        ),
    },
    {
      title: "Amal",
      render: (_: any, record: ManagementMatematicianData) => (
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
      title="Matematiklar"
      extra={
        <Button onClick={openModal} type="primary">
          Qo‘shish
        </Button>
      }
    >
      <Table
        rowKey="id"
        dataSource={data || []}
        loading={isLoading}
        columns={columns}
        scroll={{ x: 800 }}
        pagination={false}
      />

      <ModalMathematician
        open={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
        initialValues={editData}
      />
    </Card>
  );
};;;;;;;

export default Mathematicians;
