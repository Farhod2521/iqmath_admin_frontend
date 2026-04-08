import { getUsers, StudentData } from "@/services";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Card, Col, Image, Row, Select, Table, Tag } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FSearch from "@/shared/components/filters/FSearch";
import { RoleLabel } from "@/shared/utils/constants";
import RewardModal from "../components/RewardModal";
import { useForm } from "antd/es/form/Form";

const Users = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StudentData[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isReward, setIsReward] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData>();

  const [filterData, setFilterData] = useState({
    search: undefined,
    role: "student",
    status: "active",
    class_num: undefined,
    subject_name: undefined,
    lang: "uz",
    device: undefined,
  });

  const openModal = () => setIsReward(true);

  const fetchData = useCallback(() => {
    setLoading(true);

    getUsers({
      size: pagination.pageSize,
      page: pagination.current,
      ...filterData,
    })
      .then((res) => {
        setData(res?.results || []);
        setPagination((prev) => ({
          ...prev,
          total: res?.total || 0,
          current:
            res?.total > 0 && (res?.results?.length || 0) === 0
              ? 1
              : prev.current,
        }));
      })
      .finally(() => setLoading(false));
  }, [filterData, pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRewardChange = (record: StudentData) => {
    setSelectedStudent(record);
    openModal();
  };

  const handleNavigate = (data: StudentData) => {
    navigate(`/users/pupils/${data.id}?role=${filterData.role}`);
  };

  const columns: ColumnsType<StudentData> = useMemo(() => {
    const baseColumns: ColumnsType<StudentData> = [
      {
        title: "T/r",
        key: "index",

        render: (_value, _record, index) => {
          return (pagination.current - 1) * pagination.pageSize + index + 1;
        },
      },
      {
        title: t("user"),
        dataIndex: "full_name",
        key: "full_name",
        render: (value: string, record: StudentData) => (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onDoubleClick={() => handleNavigate(record)}
          >
            <span className="font-medium hover:text-blue-500 transition">
              {value || "-"}
            </span>
          </div>
        ),
      },
      {
        title: t("role"),
        dataIndex: "role",
        key: "role",
        render: (value: keyof typeof RoleLabel) => (
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="font-medium">
              {RoleLabel[value] || value || "-"}
            </span>
          </div>
        ),
      },
    ];

    if (filterData.role === "student") {
      baseColumns.push(
        {
          title: t("class"),
          dataIndex: "class_num",
          key: "class_num",
          align: "center",
          width: "80px",
          render: (value: string) => {
            const classText = value || "";
            const classNumber = classText.split(" ")[0];
            return classNumber ? `${classNumber}-${t("class")}` : "-";
          },
        },
        {
          title: t("diagnosticsStatus"),
          dataIndex: "has_diagnost",
          key: "has_diagnost",
          align: "center",
          render: (value: string) => {
            return value ? t("submitted") : t("doNotSubmit");
          },
        },

        {
          title: t("subject"),
          dataIndex: "subject_name_uz",
          key: "subject_name_uz",

          align: "center",
          render: (value: string) => value || "-",
        },
        {
          title: t("subject"),
          key: "remaining_days",
          align: "center",
          render: (data: StudentData) => {
            const days = data?.remaining_days;
            const endDate = data?.subscription_end_date;

            if (!days && !endDate) return "-";

            return (
              <div className="flex flex-col leading-tight">
                <span className="text-gray-800 text-sm font-medium">
                  {endDate}
                </span>
                <span className="text-xs text-gray-500">
                  {days} {t("remainingDays")}
                </span>
              </div>
            );
          },
        },
      );
    }

    baseColumns.push(
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
        title: t("device"),
        dataIndex: "device",
        key: "device",
        render: (value: string) => value || "-",
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
        title: t("action"),
        key: "actions",
        width: "100px",
        // fixed: "right",
        render: (_value, record) => (
          <div className="flex gap-2 justify-end">
            <button
              className="bg-[#5D87FF] cursor-pointer hover:bg-[#4570EA] text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
              title={t("giveReward")}
              onClick={() => handleRewardChange(record)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
              {t("reward")}
            </button>

            {/* <button
              className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap text-white px-3 py-1 rounded-lg text-sm"
              //   onClick={() => navigate(`/users/${record.id}`)}
            >
              {t("loginAsStudent")}
            </button> */}
          </div>
        ),
      },
    );

    return baseColumns;
  }, [
    filterData.role,
    filterData.lang,
    navigate,
    pagination.current,
    pagination.pageSize,
    handleRewardChange,
    t,
  ]);

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

  const handleFilterChange = <K extends keyof typeof filterData>(
    key: K,
    value: (typeof filterData)[K],
  ) => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));

    setFilterData((prev) => ({
      ...prev,
      [key]:
        value === "" || value === "all" || value === null ? undefined : value,
    }));
  };



  const classOptions = [
    { value: "5", label: t("class5") },
    { value: "6", label: t("class6") },
    { value: "7", label: t("class7") },
    { value: "8", label: t("class8") },
    { value: "9", label: t("class9") },
    { value: "10", label: t("class10") },
    { value: "11", label: t("class11") },
  ];

  // Fanlar ro'yxati
  const subjectOptions = [
    { value: "Algebra", label: t("algebra") },
    { value: "Matematika", label: t("math") },
    { value: "Geometriya", label: t("geometry") },
  ];

  const statusOptions = [
    { value: "active", label: t("statusActive") },
    { value: "inactive", label: t("statusInactive") },
  ];

  const deviceOptions = [
    { value: "mobile", label: t("phone") },
    { value: "web", label: t("web") },
  ];

  // Role options
  const roleOptions = [
    { value: "student", label: t("student") },
    { value: "teacher", label: t("teachers") },
    { value: "parent", label: t("parent") },
    { value: "tutor", label: t("tutor") },
  ];


  return (
    <Card title={t("users")}>
      <Row gutter={[12, 12]} className="mb-4">
        <Col xs={24} sm={12} md={8} lg={3}>
          <FSearch
            onSearchInput={(value) =>
              handleFilterChange("search", value || undefined)
            }
            style={{ width: "100%" }}
            placeholder={t("searchs")}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={3}>
          <Select
            className="w-full"
            placeholder={t("role")}
            value={filterData.role}
            options={roleOptions}
            onChange={(value) => handleFilterChange("role", value)}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={3}>
          <Select
            allowClear
            className="w-full"
            placeholder={t("status")}
            value={filterData.status}
            options={statusOptions}
            onChange={(value) => handleFilterChange("status", value)}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={3}>
          <Select
            allowClear
            className="w-full"
            placeholder="Til"
            value={filterData.lang}
            options={langOptions}
            onChange={(value) => handleFilterChange("lang", value)}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={3}>
          <Select
            allowClear
            className="w-full"
            placeholder={t("device")}
            value={filterData.device}
            options={deviceOptions}
            onChange={(value) => handleFilterChange("device", value)}
          />
        </Col>

        {filterData.role === "student" && (
          <>
            <Col xs={24} sm={12} md={8} lg={3}>
              <Select
                allowClear
                className="w-full"
                placeholder={t("class")}
                value={filterData.class_num}
                options={classOptions}
                onChange={(value) => handleFilterChange("class_num", value)}
              />
            </Col>

            <Col xs={24} sm={12} md={8} lg={3}>
              <Select
                allowClear
                className="w-full"
                placeholder={t("subject")}
                value={filterData.subject_name}
                options={subjectOptions}
                onChange={(value) => handleFilterChange("subject_name", value)}
              />
            </Col>
          </>
        )}
      </Row>
      <Table<StudentData>
        dataSource={data}
        scroll={{ x: 1400 }}
        size="small"
        columns={columns}
        bordered
        loading={loading}
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
      <RewardModal
        open={isReward}
        close={() => setIsReward(false)}
        selectedStudent={selectedStudent}
      />
    </Card>
  );
};

export default Users;




const langOptions = [
  { value: "uz", label: "uz" },
  { value: "ru", label: "ru" },
];
