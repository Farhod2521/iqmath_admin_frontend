import { deleteUser, getUsers, postUserBlock, StudentData } from "@/services";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  Button,
  Card,
  Col,
  Image,
  Popconfirm,
  Row,
  Select,
  Switch,
  Table,
  Tag,
  Tooltip,
} from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import FSearch from "@/shared/components/filters/FSearch";
import { RoleLabel } from "@/shared/utils/constants";
import RewardModal from "../components/RewardModal";

import { MdLockReset } from "react-icons/md";
import ResetPasswordModal from "../components/ResetPasswordModal";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import FineModal from "../components/FineModal";
import { useOptions } from "@/shared/hooks";
import { FaGift } from "react-icons/fa";
import { DeleteOutlined, WarningOutlined } from "@ant-design/icons";
import { handleApiError } from "@/shared/utils/handleApiError";

const Users = () => {
  const {
    roleOptions,
    statusOptions,
    deviceOptions,
    langOptions,
    classOptions,
    subjectOptions,
  } = useOptions();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StudentData[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isReward, setIsReward] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData>();
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isFine, setIsFine] = useState(false);
  const [fineStudent, setFineStudent] = useState<StudentData>();

  const [filterData, setFilterData] = useState<{
    search?: string;
    status?: string;
    role?: string;
    class_num?: number;
    subject_name?: string;
    lang?: string;
    device?: string;
  }>({
    search: undefined,
    role: "student",
    status: "active",
    class_num: undefined,
    subject_name: undefined,
    lang: "uz",
    device: undefined,
  });

  useEffect(() => {
    const roleParam = searchParams.get("role");
    const statusParam = searchParams.get("status");
    const searchParam = searchParams.get("search");

    if (
      roleParam &&
      ["student", "teacher", "parent", "tutor"].includes(roleParam)
    ) {
      setFilterData((prev) => ({ ...prev, role: roleParam }));
    }

    if (statusParam && ["active", "inactive"].includes(statusParam)) {
      setFilterData((prev) => ({ ...prev, status: statusParam }));
    }

    if (searchParam) {
      setFilterData((prev) => ({ ...prev, search: searchParam }));
    }
  }, [searchParams]);

  const [stats, setStats] = useState({
    student_count: 0,
    superadmin_count: 0,
    teacher_count: 0,
    total_count: 0,
    tutor_count: 0,
    parent_count: 0,
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

        setStats({
          student_count: res?.student_count,
          superadmin_count: res?.superadmin_count,
          teacher_count: res?.teacher_count,
          total_count: res?.total_count,
          tutor_count: res?.tutor_count,
          parent_count: res?.parent_count,
        });

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

  const handleResetPasswordChange = (record: StudentData) => {
    setSelectedStudent(record);
    setIsResetPassword(true);
  };

  const handleNavigate = (data: StudentData) => {
    navigate(`/users/pupils/${data.id}?role=${filterData.role}`);
  };

  const blockMutation = useMutation({
    mutationFn: postUserBlock,
    onSuccess: (res: any) => {
      toast.success(res?.message);
      fetchData();
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  const handleBlockUser = (record: StudentData) => {
    blockMutation.mutate({
      user_id: record.id,
      is_blocked: !record.status, // yoki backend fieldiga qarab
    });
  };

  const handleFine = (record: StudentData) => {
    setFineStudent(record);
    setIsFine(true);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      fetchData();
      toast.success(t("deletedSuccessfully") || "O‘chirildi");
    },
    onError: (err: any) => handleApiError(err),
  });

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
            <span className=" hover:text-blue-500 transition">
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
            <span className="">{RoleLabel[value] || value || "-"}</span>
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
                <span className="text-gray-800 text-sm ">{endDate}</span>
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
      // {
      //   title: t("blocked"),
      //   key: "blocked",
      //   align: "center",
      //   render: (_, record) => (
      //     <Popconfirm
      //       title={
      //         record?.is_blocked
      //           ? `${record.full_name} ni blokdan chiqarmoqchimisiz?`
      //           : `${record.full_name} ni bloklamoqchimisiz?`
      //       }
      //       okText={t("yes")}
      //       cancelText={t("no")}
      //       onConfirm={() =>
      //         blockMutation.mutate({
      //           user_id: record.id,
      //           is_blocked: false,
      //         })
      //       }
      //     >
      //       <Switch checked={record.is_blocked} />
      //     </Popconfirm>
      //   ),
      // },
      {
        title: t("action"),
        key: "actions",
        width: 120,
        align: "center",
        render: (_, record) => (
          <div className="flex items-center justify-center gap-2">
            <Tooltip title={t("reward")}>
              <button
                className="p-2 cursor-pointer rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                title={t("reward")}
                onClick={() => handleRewardChange(record)}
              >
                <FaGift size={16} />
              </button>
            </Tooltip>
            <Tooltip title={t("resetPassword")}>
              <button
                className="p-2 cursor-pointer rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                title={t("resetPassword")}
                onClick={() => handleResetPasswordChange(record)}
              >
                <MdLockReset size={18} />
              </button>
            </Tooltip>

            <Tooltip title="Jarima">
              <button
                className="p-2 cursor-pointer rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                onClick={() => handleFine(record)}
              >
                <WarningOutlined />
              </button>
            </Tooltip>
            <Popconfirm
              title={t("scoreLog.deleted")}
              okText={t("yes")}
              cancelText={t("no")}
              onConfirm={() => deleteMutation.mutate(record.id)}
            >
              <button className="p-2 cursor-pointer rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
                <DeleteOutlined />
              </button>
            </Popconfirm>
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

  if (loading && data.length === 0) {
    return (
      <Card title={t("users")}>
        <div className="flex items-center justify-center min-h-100">
          <div className="w-10 h-10 border-4 rounded-full border-amber-500 border-t-transparent animate-spin"></div>
        </div>
      </Card>
    );
  }

  const handleFineSuccess = () => {
    fetchData(); // table refresh
  };

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
      <Row gutter={[12, 12]} className="mb-4">
        <Col>
          <Tag color="blue">
            {t("totalStudents")}: {stats.student_count}
          </Tag>
        </Col>
        <Col>
          <Tag color="green">
            {t("totalTeachers")}: {stats.teacher_count}
          </Tag>
        </Col>
        <Col>
          <Tag color="orange">
            {t("totalParents")}: {stats.parent_count}
          </Tag>
        </Col>
        <Col>
          <Tag color="purple">
            {t("totalTutors")}: {stats.tutor_count}
          </Tag>
        </Col>
        <Col>
          <Tag color="red">
            {t("superadmin")}: {stats.superadmin_count}
          </Tag>
        </Col>
        <Col>
          <Tag color="gold">
            {t("total")}: {stats.total_count}
          </Tag>
        </Col>
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
      <ResetPasswordModal
        open={isResetPassword}
        close={() => setIsResetPassword(false)}
        selectedStudent={selectedStudent}
      />
      <FineModal
        open={isFine}
        close={() => setIsFine(false)}
        student={fineStudent}
        onSuccess={handleFineSuccess}
      />
    </Card>
  );
};

export default Users;
