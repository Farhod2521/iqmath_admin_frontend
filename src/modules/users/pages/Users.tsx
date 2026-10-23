import { deleteUser, getUsers, postUserBlock, StudentData } from "@/services";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Popconfirm, Select, Table, Tooltip } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import FSearch from "@/shared/components/filters/FSearch";
import RewardModal from "../components/RewardModal";

import ResetPasswordModal from "../components/ResetPasswordModal";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import FineModal from "../components/FineModal";
import { useOptions } from "@/shared/hooks";
import {
  FaAndroid,
  FaApple,
  FaChalkboardUser,
  FaGift,
  FaShieldHalved,
  FaTriangleExclamation,
  FaUser,
  FaUserGroup,
  FaUsers,
  FaUserTie,
} from "react-icons/fa6";
import { FiMonitor, FiRotateCcw, FiTrash2 } from "react-icons/fi";
import { handleApiError } from "@/shared/utils/handleApiError";

const TEXT = {
  uz: {
    subtitle: "Platforma foydalanuvchilari ro'yxati va boshqaruvi",
    subscription: "Obuna muddati",
    daysLeft: (n: number) => `${n} kun qoldi`,
    expired: "Tugagan",
    totalUsers: (n: string) => `Jami ${n} ta foydalanuvchi`,
    perPage: "/ sahifa",
    language: "Til",
    superadmin: "Superadmin",
  },
  ru: {
    subtitle: "Список и управление пользователями платформы",
    subscription: "Срок подписки",
    daysLeft: (n: number) => `осталось ${n} дн.`,
    expired: "Истекла",
    totalUsers: (n: string) => `Всего ${n} пользователей`,
    perPage: "/ стр.",
    language: "Язык",
    superadmin: "Суперадмин",
  },
};

const ROLE_TEXT: Record<string, { uz: string; ru: string }> = {
  student: { uz: "O'quvchi", ru: "Ученик" },
  teacher: { uz: "Mentor", ru: "Ментор" },
  parent: { uz: "Ota-ona", ru: "Родитель" },
  tutor: { uz: "O'qituvchi", ru: "Учитель" },
  superadmin: { uz: "Superadmin", ru: "Суперадмин" },
};

const AVATAR_TONES = [
  "bg-[#EAF2FF] text-[#2563EB]",
  "bg-[#FFF1E6] text-[#EA6C0B]",
  "bg-[#E8F8EF] text-[#16A34A]",
  "bg-[#F3EDFF] text-[#7C3AED]",
  "bg-[#FDEBF4] text-[#DB2777]",
  "bg-[#E6F7FA] text-[#0891B2]",
];

const initials = (name?: string) =>
  (name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

const formatCount = (value?: number) =>
  Number(value || 0)
    .toLocaleString("ru-RU")
    .replace(/,/g, " ");

const Pill = ({ tone, children }: { tone: string; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-0.5 text-[12px] font-semibold ${tone}`}
  >
    {children}
  </span>
);

const FlagIcon = ({ lang }: { lang: string }) =>
  lang === "ru" ? (
    <svg viewBox="0 0 30 20" className="h-3 w-[18px] overflow-hidden rounded-[2px]">
      <rect width="30" height="20" fill="#D52B1E" />
      <rect width="30" height="13.3" fill="#0039A6" />
      <rect width="30" height="6.7" fill="#fff" />
    </svg>
  ) : (
    <svg viewBox="0 0 30 20" className="h-3 w-[18px] overflow-hidden rounded-[2px]">
      <rect width="30" height="20" fill="#1EB53A" />
      <rect width="30" height="13.2" fill="#fff" />
      <rect width="30" height="6.4" fill="#0099B5" />
      <rect y="6.4" width="30" height="0.6" fill="#CE1126" />
      <rect y="12.6" width="30" height="0.6" fill="#CE1126" />
    </svg>
  );

const DEVICE_ICON: Record<string, React.ReactNode> = {
  web: <FiMonitor size={15} />,
  ios: <FaApple size={15} />,
  android: <FaAndroid size={15} />,
};

const ActionButton = ({
  tone,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone: string }) => (
  <button
    type="button"
    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition ${tone}`}
    {...rest}
  >
    {children}
  </button>
);

const Users = () => {
  const {
    roleOptions,
    statusOptions,
    deviceOptions,
    langOptions,
    classOptions,
    subjectOptions,
  } = useOptions();

  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ru") ? "ru" : "uz";
  const text = TEXT[lang];
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StudentData[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
  });
  const [isReward, setIsReward] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData>();
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isFine, setIsFine] = useState(false);
  const [fineStudent, setFineStudent] = useState<StudentData>();

  const getInitialFilter = () => {
    const roleParam = searchParams.get("role");
    const statusParam = searchParams.get("status");
    const searchParam = searchParams.get("search");

    return {
      search: searchParam || undefined,
      role:
        roleParam &&
        ["student", "teacher", "parent", "tutor"].includes(roleParam)
          ? roleParam
          : "student", // default student
      status:
        statusParam && ["active", "inactive"].includes(statusParam)
          ? statusParam
          : "active",
      class_num: undefined,
      subject_name: undefined,
      lang: "uz",
      device: undefined,
    };
  };

  // STATE ni URL dan initialize qilish
  const [filterData, setFilterData] = useState(getInitialFilter);

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
          total: res?.total,
          current:
            res?.total > 0 && res?.results?.length === 0 ? 1 : prev?.current,
        }));
      })
      .catch((error) => {
        handleApiError(error);
      })
      .finally(() => setLoading(false));
  }, [
    pagination.current,
    pagination.pageSize,
    filterData.class_num,
    filterData.device,
    filterData.lang,
    filterData.role,
    filterData.search,
    filterData.status,
    filterData.subject_name,
  ]);

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
    // Ro'yxatdagi `id` — profil (o'quvchi, mentor...) id'si; o'chirish esa foydalanuvchi id'si bilan ishlaydi
    mutationFn: (userId: number) => deleteUser(userId),
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
        width: 56,
        align: "center",
        render: (_value, _record, index) => (
          <span className="text-[#64748B]">
            {(pagination.current - 1) * pagination.pageSize + index + 1}
          </span>
        ),
      },
      {
        title: t("user"),
        dataIndex: "full_name",
        key: "full_name",
        width: 230,
        render: (value: string, record: StudentData) => (
          <div
            className="group flex cursor-pointer items-center gap-2.5"
            onDoubleClick={() => handleNavigate(record)}
            title={value}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                AVATAR_TONES[(record.id || 0) % AVATAR_TONES.length]
              }`}
            >
              {initials(value)}
            </span>
            <span className="line-clamp-2 font-semibold text-[#0F172A] transition group-hover:text-[#2563EB]">
              {value || "-"}
            </span>
          </div>
        ),
      },
      {
        title: t("role"),
        dataIndex: "role",
        key: "role",
        render: (value: string) => (
          <Pill tone="bg-[#EAF2FF] text-[#2563EB]">
            {ROLE_TEXT[value]?.[lang] || value || "-"}
          </Pill>
        ),
      },
    ];

    if (filterData.role === "student") {
      baseColumns.push(
        {
          title: t("class"),
          dataIndex: "class_num",
          key: "class_num",
          width: 80,
          render: (value: string) => {
            const classNumber = (value || "").split(" ")[0];
            return classNumber ? `${classNumber}-${t("class")}` : "-";
          },
        },
        {
          title: t("diagnosticsStatus"),
          dataIndex: "has_diagnost",
          key: "has_diagnost",
          render: (value: boolean) =>
            value ? (
              <Pill tone="bg-[#E8F8EF] text-[#16A34A]">{t("submitted")}</Pill>
            ) : (
              <Pill tone="bg-[#FDECEC] text-[#DC2626]">{t("doNotSubmit")}</Pill>
            ),
        },
        {
          title: t("subject"),
          dataIndex: "subject_name_uz",
          key: "subject_name_uz",
          render: (value: string, record: StudentData) =>
            (lang === "ru" ? record.subject_name_ru : value) || value || "-",
        },
        {
          title: text.subscription,
          key: "remaining_days",
          render: (record: StudentData) => {
            const days = record?.remaining_days;
            const endDate = record?.subscription_end_date;
            if (!days && !endDate) return "-";
            return (
              <Tooltip title={endDate}>
                {days > 0 ? (
                  <Pill tone="bg-[#EAF2FF] text-[#2563EB]">{text.daysLeft(days)}</Pill>
                ) : (
                  <Pill tone="bg-[#F1F3F7] text-[#64748B]">{text.expired}</Pill>
                )}
              </Tooltip>
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
        render: (value: string) =>
          value ? <span className="whitespace-nowrap">{value}</span> : "-",
      },
      {
        title: t("status"),
        dataIndex: "status",
        key: "status",
        render: (value: boolean) =>
          value ? (
            <Pill tone="bg-[#E8F8EF] text-[#16A34A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
              {t("active") || "Faol"}
            </Pill>
          ) : (
            <Pill tone="bg-[#F1F3F7] text-[#64748B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#94A3B8]" />
              {t("inactive") || "Faol emas"}
            </Pill>
          ),
      },
      {
        title: t("device"),
        dataIndex: "device",
        key: "device",
        render: (value: string | null) =>
          value ? (
            <span className="flex items-center gap-1.5 capitalize text-[#334155]">
              <span className="text-[#475569]">
                {DEVICE_ICON[value] || <FiMonitor size={15} />}
              </span>
              {value === "ios" ? "iOS" : value}
            </span>
          ) : (
            "-"
          ),
      },
      {
        title: t("registerLanguage"),
        dataIndex: "lang",
        key: "lang",
        render: (value: string) =>
          value ? (
            <span className="flex items-center gap-1.5">
              <FlagIcon lang={value} />
              {value}
            </span>
          ) : (
            "-"
          ),
      },
      {
        title: t("register_date") || "Ro'yxatdan o'tish",
        dataIndex: "registration_date",
        key: "registration_date",
        render: (value: string) =>
          value ? (
            <span className="whitespace-nowrap">{value.replaceAll("-", ".")}</span>
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
            <span className="whitespace-nowrap">{value.replaceAll("/", ".")}</span>
          ) : (
            <span className="text-gray-400">-</span>
          ),
      },
      {
        title: t("action"),
        key: "actions",
        width: 170,
        align: "center",
        fixed: "right",
        render: (_, record) => (
          <div className="flex items-center justify-center gap-1.5">
            <Tooltip title={t("reward")}>
              <ActionButton
                tone="bg-[#EAF2FF] text-[#2563EB] hover:bg-[#D7E6FF]"
                onClick={() => handleRewardChange(record)}
              >
                <FaGift size={14} />
              </ActionButton>
            </Tooltip>
            <Tooltip title={t("resetPassword")}>
              <ActionButton
                tone="bg-[#F1EDFF] text-[#6D28D9] hover:bg-[#E3DAFF]"
                onClick={() => handleResetPasswordChange(record)}
              >
                <FiRotateCcw size={15} />
              </ActionButton>
            </Tooltip>
            {filterData.role === "student" && (
              <Tooltip title={t("issueFine")}>
                <ActionButton
                  tone="bg-[#FFF4E0] text-[#D97706] hover:bg-[#FFE7BF]"
                  onClick={() => handleFine(record)}
                >
                  <FaTriangleExclamation size={14} />
                </ActionButton>
              </Tooltip>
            )}
            <Popconfirm
              title={t("scoreLog.deleted")}
              okText={t("yes")}
              cancelText={t("no")}
              okButtonProps={{ danger: true }}
              onConfirm={() => deleteMutation.mutate(record.user_id)}
            >
              <ActionButton tone="bg-[#FDECEC] text-[#DC2626] hover:bg-[#FBD5D5]">
                <FiTrash2 size={15} />
              </ActionButton>
            </Popconfirm>
          </div>
        ),
      },
    );

    return baseColumns;
  }, [
    filterData.role,
    filterData.lang,
    lang,
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
    setFilterData((prev) => ({
      ...prev,
      [key]:
        value === "" || value === "all" || value === null ? undefined : value,
    }));
  };

  const handleSearch = useCallback(
    (value: string) => {
      handleFilterChange("search", value || undefined);
    },
    [handleFilterChange],
  );

  const handleFineSuccess = () => {
    fetchData(); // table refresh
  };

  const statCards = [
    { key: "students", label: t("totalStudents"), value: stats.student_count, Icon: FaUser, color: "#2563EB", soft: "#EAF2FF" },
    { key: "teachers", label: t("totalTeachers"), value: stats.teacher_count, Icon: FaUserGroup, color: "#16A34A", soft: "#E8F8EF" },
    { key: "parents", label: t("totalParents"), value: stats.parent_count, Icon: FaUserTie, color: "#EA6C0B", soft: "#FFF1E6" },
    { key: "tutors", label: t("totalTutors"), value: stats.tutor_count, Icon: FaChalkboardUser, color: "#7C3AED", soft: "#F3EDFF" },
    { key: "superadmin", label: text.superadmin, value: stats.superadmin_count, Icon: FaShieldHalved, color: "#DC2626", soft: "#FDECEC" },
    { key: "total", label: t("total"), value: stats.total_count, Icon: FaUsers, color: "#475569", soft: "#F1F3F7" },
  ];

  const filterLabel = (label: string) => (
    <span className="mb-1.5 block text-[12.5px] font-medium text-[#64748B]">{label}</span>
  );

  return (
    <div className="iq-users space-y-5 p-2 font-['Manrope',sans-serif] sm:p-3">
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-[#0F172A]">{t("users")}</h1>
        <p className="mt-0.5 text-[14px] text-[#64748B]">{text.subtitle}</p>
      </div>

      {/* Filtrlar */}
      <div className="rounded-[18px] border border-[#EDF0F7] bg-white p-4 shadow-[0_14px_34px_-30px_rgba(30,41,99,0.4)]">
        <div className="iq-filter grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
          <div className="flex flex-col justify-end">
            <FSearch
              onSearchInput={handleSearch}
              style={{ width: "100%" }}
              placeholder={t("searchs")}
            />
          </div>
          <div>
            {filterLabel(t("role"))}
            <Select
              className="w-full"
              placeholder={t("role")}
              value={filterData.role}
              options={roleOptions}
              onChange={(value) => handleFilterChange("role", value)}
            />
          </div>
          <div>
            {filterLabel(t("status"))}
            <Select
              allowClear
              className="w-full"
              placeholder={t("status")}
              value={filterData.status}
              options={statusOptions}
              onChange={(value) => handleFilterChange("status", value)}
            />
          </div>
          <div>
            {filterLabel(text.language)}
            <Select
              allowClear
              className="w-full"
              placeholder={text.language}
              value={filterData.lang}
              options={langOptions}
              onChange={(value) => handleFilterChange("lang", value)}
            />
          </div>
          <div>
            {filterLabel(t("device"))}
            <Select
              allowClear
              className="w-full"
              placeholder={t("device")}
              value={filterData.device}
              options={deviceOptions}
              onChange={(value) => handleFilterChange("device", value)}
            />
          </div>
          {filterData.role === "student" && (
            <>
              <div>
                {filterLabel(t("class"))}
                <Select
                  allowClear
                  className="w-full"
                  placeholder={t("class")}
                  value={filterData.class_num}
                  options={classOptions}
                  onChange={(value) => handleFilterChange("class_num", value)}
                />
              </div>
              <div>
                {filterLabel(t("subject"))}
                <Select
                  allowClear
                  className="w-full"
                  placeholder={t("subject")}
                  value={filterData.subject_name}
                  options={subjectOptions}
                  onChange={(value) => handleFilterChange("subject_name", value)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Rollar bo'yicha sonlar */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {statCards.map(({ key, label, value, Icon, color, soft }) => (
          <div
            key={key}
            className="flex items-center gap-3 rounded-[18px] border border-[#EDF0F7] bg-white px-4 py-3.5 shadow-[0_14px_34px_-30px_rgba(30,41,99,0.4)]"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: soft, color }}
            >
              <Icon size={20} />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[13px] text-[#64748B]">{label}</span>
              <span className="mt-1 block text-[22px] font-extrabold text-[#0F172A]">
                {formatCount(value)}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Jadval */}
      <div className="rounded-[18px] border border-[#EDF0F7] bg-white p-3 shadow-[0_14px_34px_-30px_rgba(30,41,99,0.4)] sm:p-4">
        <Table<StudentData>
          dataSource={data}
          scroll={{ x: "max-content" }}
          size="middle"
          columns={columns}
          loading={loading}
          onChange={handleTableChange}
          rowKey={(record) => String(record?.id)}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            pageSizeOptions: [10, 20, 30, 50, 70, 100],
            showSizeChanger: true,
            locale: { items_per_page: text.perPage },
            showTotal: (total) => (
              <span className="text-[13.5px] text-[#64748B]">
                {text.totalUsers(formatCount(total))}
              </span>
            ),
          }}
        />
      </div>

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

      <style>{`
        .iq-users .ant-select-selector,
        .iq-users .ant-input-search .ant-input,
        .iq-users .iq-filter .ant-input,
        .iq-users .iq-filter .ant-input-affix-wrapper {
          border-radius: 10px !important;
        }
        .iq-users .iq-filter .ant-input,
        .iq-users .iq-filter .ant-input { height: 38px; }
        .iq-users .ant-table-thead > tr > th,
        .iq-users .ant-table-tbody > tr > td { white-space: nowrap; }
        .iq-users .ant-select { height: 38px; }
        .iq-users .ant-input-search .ant-input { height: 38px; }
        .iq-users .ant-input-search .ant-input-group-addon .ant-btn {
          height: 38px;
          border-radius: 0 10px 10px 0 !important;
        }
        .iq-users .ant-input-search .ant-input-group > .ant-input:first-child {
          border-radius: 10px 0 0 10px !important;
        }
        .iq-users .ant-table { font-family: inherit; }
        .iq-users .ant-table-thead > tr > th {
          background: #F6F8FC !important;
          color: #334155;
          font-weight: 600;
          font-size: 13px;
          border-bottom: none !important;
        }
        .iq-users .ant-table-thead > tr > th::before { display: none; }
        .iq-users .ant-table-thead > tr > th:first-child { border-radius: 12px 0 0 12px !important; }
        .iq-users .ant-table-thead > tr > th:last-child { border-radius: 0 12px 12px 0 !important; }
        .iq-users .ant-table-tbody > tr > td {
          border-bottom: 1px solid #F0F2F7;
          color: #0F172A;
          font-size: 13.5px;
        }
        .iq-users .ant-table-tbody > tr:hover > td { background: #FAFBFE !important; }
        .iq-users .ant-pagination .ant-pagination-item { border-radius: 8px; border-color: #E5E9F2; }
        .iq-users .ant-pagination .ant-pagination-item-active { background: #2563EB; border-color: #2563EB; }
        .iq-users .ant-pagination .ant-pagination-item-active a { color: #fff; }
        .iq-users .ant-table-pagination.ant-pagination { width: 100%; }
        .iq-users .ant-pagination .ant-pagination-total-text { margin-right: auto; }
      `}</style>
    </div>
  );
};

export default Users;
