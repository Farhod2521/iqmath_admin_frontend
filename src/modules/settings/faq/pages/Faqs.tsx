import { Button, Card, Popconfirm, Space, Table, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getManagementFaqs,
  postFileManagementFaq,
  putManagementFaq,
  deleteManagementFaq,
  ManagementFaqData,
} from "@/services";
import { useState, useEffect } from "react";
import { handleApiError } from "@/shared/utils/handleApiError";
import ModalFaq from "../components/ModalFaq";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<ManagementFaqData | null>(null);

  // GET
  const { data, isLoading, error } = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      const res = await getManagementFaqs();
      return res;
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // CREATE
  const createMutation = useMutation({
    mutationFn: postFileManagementFaq,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["faq"] });
      closeModal();
    },
    onError: (e) => handleApiError(e),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => putManagementFaq(id, data),
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["faq"] });
      closeModal();
    },
    onError: (e) => handleApiError(e),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteManagementFaq,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },
    onError: (e) => handleApiError(e),
  });

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setEditData(null);
  };

  const handleEdit = (record: ManagementFaqData) => {
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
  const stripHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const columns = [
    {
      title: t("faqs.index"),
      dataIndex: "id",
      key: "id",
      width: "10px",
      render: (text: string, record: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: t("faqs.question"),
      dataIndex: "question",
    },
    {
      title: t("faqs.answer"),
      dataIndex: "answer",
      render: (val: string) => {
        const text = stripHtml(val);
        const short = text.length > 100 ? text.slice(0, 100) + "..." : text;

        return (
          <Tooltip title={text}>
            <span>{text.length > 80 ? text.slice(0, 80) + "..." : text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: t("faqs.video"),
      dataIndex: "url",
      render: (val: string) =>
        val ? (
          <a href={val} target="_blank">
            {t("faqs.view")}
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: t("action"),
      width: "10px",
      render: (_: any, record: ManagementFaqData) => (
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
            title={t("faqs.deleteConfirm")}
            okText={t("yes")}
            cancelText={t("no")}
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={t("faqs.title")}
      extra={
        <Button type="primary" onClick={openModal}>
          + {t("adding")}
        </Button>
      }
    >
      <Table
        rowKey="id"
        dataSource={data || []}
        loading={isLoading}
        columns={columns}
        pagination={false}
        scroll={{ x: 800 }}
      />

      <ModalFaq
        open={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
        initialValues={editData}
      />
    </Card>
  );
};;;;;;;

export default Faq;
