import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
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
  getManagementProducts,
  postManagementProduct,
  putManagementProduct,
  deleteManagementProduct,
  ManagementProductData,
  getManagementProduct,
} from "@/services";
import { useState, useEffect } from "react";
import { handleApiError } from "@/shared/utils/handleApiError";
import { toast } from "react-toastify";

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("uz-UZ").format(value) + ".000" + " so'm";
};

const Products = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<ManagementProductData | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // GET
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await getManagementProducts();
      return res;
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // CREATE
  const createMutation = useMutation({
    mutationFn: postManagementProduct,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
    onError: (e) => handleApiError(e),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => putManagementProduct(id, data),
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
    onError: (e) => handleApiError(e),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteManagementProduct,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
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

  // EDIT
  const handleEdit = (record: ManagementProductData) => {
    getManagementProduct(record.id)
      .then((res) => {
        setEditData(res);
        form.setFieldsValue(res);
        openModal();
      })
      .catch((err) => handleApiError(err));
  };

  // SUBMIT
  const handleSubmit = async () => {
    const values = await form.validateFields();

    const payload = {
      ...values,
      image: values?.image || file, //  file qo‘shiladi
    };

    // ❗ faqat file bo‘lsa yuboramiz
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
    {
      title: "Mahsulot nomi (uz)",
      dataIndex: "name_uz",
    },
    {
      title: "Mahsulot nomi (ru)",
      dataIndex: "name_ru",
    },
    {
      title: "Kerakli tanga",
      dataIndex: "coin",
    },
    {
      title: "Narxi (so'm)",
      dataIndex: "price_money",
      render: (value: number) => formatMoney(value),
    },
    // { title: "Narxi (ball)", dataIndex: "price_score" },
    {
      title: "Mahsulot soni",
      dataIndex: "count",
    },
    {
      title: "Rasm",
      render: (_: any, record: ManagementProductData) => (
        <img src={record.image} width={50} />
      ),
    },
    {
      title: "Amal",
      render: (_: any, record: ManagementProductData) => (
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
      title="Mahsulotlar"
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

      <Modal
        open={isOpen}
        onCancel={closeModal}
        onOk={handleSubmit}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        title={editData ? "Tahrirlash" : "Yangi mahsulot"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name_uz"
            label="Nomi UZ"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="name_ru"
            label="Nomi RU"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="coin"
            label="Kerakli tanga"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="count"
            label="Mahsulot soni"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Rasm">
            <Upload
              beforeUpload={(file) => {
                setFile(file);
                return false; // uploadni to‘xtatamiz
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Rasm yuklash</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Products;
