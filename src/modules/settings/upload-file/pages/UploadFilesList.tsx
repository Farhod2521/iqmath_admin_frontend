import { Button, Card, Table, Upload, Popconfirm, Space } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileOutlined,
} from "@ant-design/icons";
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
import { useTranslation } from "react-i18next";

const UploadFilesList = () => {
    const { t } = useTranslation();
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

  const getFileType = (url: string) => {
    const ext = url.split(".").pop()?.toLowerCase();

    if (!ext) return "unknown";

    if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
    if (["pdf"].includes(ext)) return "pdf";
    if (["doc", "docx"].includes(ext)) return "word";

    return "file";
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "-";

    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  };

  const FilePreview = ({ url }: { url: string }) => {
    const type = getFileType(url);

    if (type === "image") {
      return (
        <img
          src={url}
          width={60}
          height={60}
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      );
    }

    if (type === "pdf") {
      return <FilePdfOutlined style={{ fontSize: 40, color: "red" }} />;
    }

    if (type === "word") {
      return <FileWordOutlined style={{ fontSize: 40, color: "blue" }} />;
    }

    return <FileOutlined style={{ fontSize: 40 }} />;
  };

  const columns = [
    {
      title: t("uploadFiles.index"),
      dataIndex: "id",
      key: "id",
      width: "10px",
      render: (text: string, record: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },

    {
      title: t("uploadFiles.view"),
      render: (_: any, record: ManagementUploadFileData) => (
        <FilePreview url={record.file_url} />
      ),
    },
    {
      title: t("uploadFiles.file"),
      dataIndex: "file_url",
      render: (url: string) => (
        <a href={url} target="_blank">
          {t("uploadFiles.view")}
        </a>
      ),
    },
    {
      title: t("uploadFiles.name"),
      render: (_: any, record: ManagementUploadFileData) => {
        const name = record.file_url.split("/").pop();
        return name || "-";
      },
    },
    // {
    //   title: "Avtor",
    //   dataIndex: "created_by", // backenddan kelishi kerak
    //   render: (val: string) => val || "-",
    // },
    {
      title: t("uploadFiles.format"),
      render: (_: any, record: ManagementUploadFileData) => {
        const ext = record.file_url.split(".").pop();
        return ext?.toUpperCase() || "-";
      },
    },
    // {
    //   title: "Hajmi",
    //   render: (_: any, record: ManagementUploadFileData) =>
    //     formatFileSize(record.size),
    // },
    {
      title: t("uploadFiles.uploadedAt"),
      dataIndex: "uploaded_at",
      render: (val: string) => formatDateColumn(val),
    },

    {
      title: t("action"),
      width: "10px",
      render: (_: any, record: ManagementUploadFileData) => (
        <Space>
          <Popconfirm
            title={t("uploadFiles.deleteConfirm")}
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
      title={t("uploadFiles.title")}
      extra={
        <Space>
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>
              {" "}
              {t("uploadFiles.chooseFile")}
            </Button>
          </Upload>

          <Button
            type="primary"
            onClick={handleUpload}
            loading={uploadMutation.isPending}
          >
            {t("uploadFiles.upload")}
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



