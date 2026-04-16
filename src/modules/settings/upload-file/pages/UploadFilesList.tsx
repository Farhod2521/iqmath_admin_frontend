import {
  Button,
  Card,
  Table,
  Upload,
  Popconfirm,
  Space,
  TablePaginationConfig,
  Tag,
  DatePicker,
} from "antd";
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
  ManagementUploadFileParams,
} from "@/services";
import { useState, useEffect } from "react";
import { handleApiError } from "@/shared/utils/handleApiError";
import { toast } from "react-toastify";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const UploadFilesList = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filterData, setFilterData] = useState<ManagementUploadFileParams>({
    date_from: undefined,
    date_to: undefined,
    date: undefined,
  });

  // GET
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "files-upload-data",
      pagination.current,
      pagination.pageSize,
      filterData,
    ],
    queryFn: async () => {
      const res = await getManagementUploadFiles({
        page: pagination?.current,
        page_size: pagination?.pageSize,
        ...filterData,
      });
      return res;
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({
        ...prev,
        total: data?.total,
        current:
          data?.total > 0 && data?.results?.length === 0 ? 1 : prev?.current,
      }));
    }
  }, [data]);

  // UPLOAD
  const uploadMutation = useMutation({
    mutationFn: postFileManagementUploadFile,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["files-upload-data"] });
      setFile(null);
    },
    onError: (e) => handleApiError(e),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteManagementUploadFile,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["files-upload-data"] });
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
      render: (_value: any, _record: any, index: number) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
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
    {
      title: t("uploadFiles.fileSize"),
      dataIndex: "file_size_mb",
      render: (val: number) => val || "-",
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

  const handleTableChange = (p: TablePaginationConfig) => {
    setPagination((prev) => ({ ...prev, ...p }));
  };

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
      <Space style={{ marginBottom: 16 }}>
        <RangePicker
          style={{ width: 280 }}
          format="DD.MM.YYYY"
          placeholder={[t("dates.fromDate"), t("dates.toDate")]}
          onChange={(dates) => {
            setFilterData((prev) => ({
              ...prev,
              date_from: dates?.[0]
                ? dayjs(dates[0]).format("YYYY-MM-DD")
                : undefined,
              date_to: dates?.[1]
                ? dayjs(dates[1]).format("YYYY-MM-DD")
                : undefined,
            }));
          }}
        />
        <DatePicker
          style={{ width: 160 }}
          format="DD.MM.YYYY"
          placeholder={t("dates.specificDate")}
          onChange={(date) => {
            setFilterData((prev) => ({
              ...prev,
              date: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
            }));
          }}
        />
      </Space>

      <Table
        size="small"
        dataSource={data?.results || []}
        loading={isLoading}
        rowKey={(record) => String(record?.id)}
        onChange={handleTableChange}
        columns={columns}
        pagination={{
          ...pagination,
          pageSizeOptions: [10, 20, 30, 50, 70, 100],
          showSizeChanger: true,
          locale: { items_per_page: "" },
          showTotal: (total, rage) => (
            <Tag className="pagination_tag">
              Jami: <b>{total}</b>
            </Tag>
          ),
        }}
        scroll={{ x: 600 }}
      />
    </Card>
  );
};

export default UploadFilesList;
