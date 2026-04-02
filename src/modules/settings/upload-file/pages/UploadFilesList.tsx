import { Button, Card, Table, Upload, Popconfirm, Space } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getManagementUploadFiles,
  postFileManagementUploadFile,
  deleteManagementUploadFile,
  ManagementUploadFileData,
} from "@/services";
import { useState, useEffect } from "react";
import { handleApiError } from "@/shared/utils/handleApiError";
import { toast } from "react-toastify";
import { formatDateColumn } from "@/shared/components/tables/formatters";

const UploadFilesList = () => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  // GET
  const { data, isLoading, error } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const res = await getManagementUploadFiles({
        page: pagination?.current,
        limit: pagination?.pageSize,
      });
      return res;
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // UPLOAD
  const uploadMutation = useMutation({
    mutationFn: postFileManagementUploadFile,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["files"] });
      setFile(null);
    },
    onError: (e) => handleApiError(e),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteManagementUploadFile,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (e) => handleApiError(e),
  });

  const handleUpload = () => {
    if (!file) return;
    uploadMutation.mutate(file);
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
      title: "Fayl",
      dataIndex: "file_url",
      render: (url: string) => (
        <a href={url} target="_blank">
          Ko‘rish
        </a>
      ),
    },
    {
      title: "Yuklangan vaqti",
      dataIndex: "uploaded_at",
      render: (val: string) => formatDateColumn(val),
    },
    {
      title: "Amal",
      width: "10px",
      render: (_: any, record: ManagementUploadFileData) => (
        <Space>
          <Popconfirm
            title="Faylni o‘chirishni tasdiqlaysizmi?"
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
      title="Fayllar"
      extra={
        <Space>
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Fayl tanlash</Button>
          </Upload>

          <Button
            type="primary"
            onClick={handleUpload}
            loading={uploadMutation.isPending}
          >
            Yuklash
          </Button>
        </Space>
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
    </Card>
  );
};

export default UploadFilesList;
