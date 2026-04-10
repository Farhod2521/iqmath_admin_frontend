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
import SingleImageUpload from "@/shared/components/image/SingleImageUpload";
import ProductModal from "../components/ProductModal";
import { useTranslation } from "react-i18next";

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("uz-UZ").format(value) + ".000" + " so'm";
};

const Products = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<ManagementProductData | null>(null);

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
    form.resetFields();
  };

  // EDIT
  const handleEdit = (record: ManagementProductData) => {
    getManagementProduct(record.id)
      .then((res) => {
        setEditData(res);
        form.setFieldsValue({
          ...res,
          image: res.image
            ? [
                {
                  uid: "-1",
                  name: "image.png",
                  status: "done",
                  url: res.image,
                },
              ]
            : [],
        });

        openModal();
      })
      .catch((err) => handleApiError(err));
  };

  // SUBMIT
  const handleSubmit = async (values: any, file: File | null) => {
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
      title: t("productsMenu.index"),
      dataIndex: "id",
      key: "id",
      width: "10px",
      render: (text: string, record: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: t("productsMenu.nameUz"),
      dataIndex: "name_uz",
    },
    {
      title: t("productsMenu.nameRu"),
      dataIndex: "name_ru",
    },
    {
      title: t("productsMenu.coin"),
      dataIndex: "coin",
    },
    {
      title: t("productsMenu.price"),
      dataIndex: "price_money",
      render: (value: number) => formatMoney(value),
    },
    // { title: "Narxi (ball)", dataIndex: "price_score" },
    {
      title: t("productsMenu.count"),
      dataIndex: "count",
    },
    {
      title: t("productsMenu.image"),
      render: (_: any, record: ManagementProductData) => (
        <img src={record.image} width={50} />
      ),
    },
    {
      title: t("productsMenu.action"),
      render: (_: any, record: ManagementProductData) => (
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
            title={t("deleteConfirm")}
            okText={t("yes")}
            cancelText={t("no")}
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={t("productsMenu.title")}
      extra={
        <Button onClick={openModal} type="primary">
          {t("productsMenu.add")}
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
      <ProductModal
        open={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
        initialValues={editData}
      />
    </Card>
  );
};

export default Products;
