import { getUsers, StudentData } from "@/services";
import FSearch from "@/shared/components/filters/FSearch";
import { RoleLabel } from "@/shared/utils/constants";
import { handleApiError } from "@/shared/utils/handleApiError";
import { Button, Card, Select, Table, Tag } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useTranslation } from "react-i18next";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Mentors = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<StudentData[]>([]);

  const [filterData, setFilterData] = useState({
    search: undefined,
    role: "teacher",
    status: "active",
    lang: "uz",
    device: undefined,
  });

  const fetchData = useCallback(() => {
    setIsLoading(true);

    getUsers({
      size: pagination.pageSize,
      page: pagination.current,
      ...filterData,
    })
      .then((res) => {
        setData(res?.results);
        setPagination((prev) => ({
          ...prev,
          total: res?.total || 0,
          current:
            res?.total > 0 && (res?.results?.length || 0) === 0
              ? 1
              : prev.current,
        }));
      })
      .catch((err) => handleApiError(err))
      .finally(() => setIsLoading(false));
  }, [pagination.current, pagination.pageSize, filterData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNavigate = (id: number) => {
    navigate(`/mentors/${id}`);
  };

  const columns: ColumnsType<StudentData> = [
    {
      title: "ID",
      key: "index",
      render: (_value, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: t("user"),
      dataIndex: "full_name",
      key: "full_name",
      render: (value: string) => (
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="font-medium">{value || "-"}</span>
        </div>
      ),
    },

    {
      title: t("phone"),
      dataIndex: "phone",
      key: "phone",
      render: (value: string) => value || "-",
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (value: boolean) =>
        value ? (
          <Tag color="green">{t("active") || "Faol"}</Tag>
        ) : (
          <Tag color="default">{t("inactive") || "Faol emas"}</Tag>
        ),
    },
    {
      title: t("registerLanguage"),
      dataIndex: "lang",
      key: "lang",
      render: (value: string) => value || "-",
    },
    {
      title: t("register_date") || "Ro'yxatdan o'tish",
      dataIndex: "registration_date",
      key: "registration_date",
      render: (value: string) =>
        value ? (
          <span>{value.replaceAll("-", ".")}</span>
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    {
      title: t("lastLoginTime") || "Oxirgi kirish",
      dataIndex: "last_login_time",
      key: "last_login_time",
      render: (value: string) =>
        value ? (
          <span>{value.replaceAll("/", ".")}</span>
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    {
      title: t("device"),
      dataIndex: "device",
      key: "device",
      render: (value: string) => value || "-",
    },
    {
      title: "Amal",
      dataIndex: "user_id",
      key: "user_id",
      render: (value) => (
        <div>
          <Button
            color="blue"
            variant="outlined"
            onClick={() => handleNavigate(value)}
          >
            <FaInfoCircle />
          </Button>
        </div>
      ),
    },
  ];

  const handleTableChange = (p: TablePaginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: p.current || 1,
      pageSize: p.pageSize || 10,
    }));

    if (p.pageSize !== pagination.pageSize) {
      setData([]);
    }
  };

  const statusOptions = [
    { value: "active", label: t("statusActive") },
    { value: "inactive", label: t("statusInactive") },
  ];

  const deviceOptions = [
    { value: "mobile", label: t("submitted") },
    { value: "web", label: t("web") },
  ];
  return (
    <Card title={t("teachers")}>
      <div className="flex items-center gap-2 mb-4">
        <FSearch
          onSearchInput={(value) =>
            setFilterData((prev) => ({
              ...prev,
              search: value,
            }))
          }
          className="w-[200px]!"
          placeholder="Qidiruv..."
        />
        <Select
          allowClear
          style={{ width: "150px" }}
          className="w-full"
          placeholder={t("status")}
          value={filterData.status}
          options={statusOptions}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              status: value,
            }))
          }
        />
        <Select
          allowClear
          className="w-full"
          placeholder="Til"
          style={{ width: "150px" }}
          value={filterData.lang}
          options={langOptions}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              lang: value,
            }))
          }
        />
        <Select
          allowClear
          className="w-full"
          placeholder="Qurilma"
          style={{ width: "150px" }}
          value={filterData.device}
          options={deviceOptions}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              device: value,
            }))
          }
        />
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        size="small"
        scroll={{ x: 1400 }}
        bordered
        dataSource={data}
        onChange={handleTableChange}
        rowKey={(record) => String(record?.id)}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          pageSizeOptions: [10, 20, 30, 50, 70, 100],
          showSizeChanger: true,
          locale: { items_per_page: "" },
          showTotal: (total) => (
            <Tag className="pagination_tag">
              Jami: <b>{total}</b>
            </Tag>
          ),
        }}
      />
    </Card>
  );
};

export default Mentors;

const langOptions = [
  { value: "uz", label: "uz" },
  { value: "ru", label: "ru" },
];
