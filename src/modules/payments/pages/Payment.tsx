import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { deletePayments, getPayments, PaymentsData } from "../services";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import { handleApiError } from "@/shared/utils/handleApiError";
import { ColumnsType } from "antd/es/table";

const { Text } = Typography;

const formatMoney = (v: any) => {
  const n = Number(v);
  if (Number.isNaN(n)) return String(v ?? "");
  return n.toLocaleString("uz-UZ");
};

const statusColor = (status?: string) => {
  const s = (status || "").toLowerCase();
  if (s === "success" || s === "paid") return "green";
  if (s === "pending" || s === "processing") return "gold";
  if (s === "failed" || s === "canceled" || s === "cancelled") return "red";
  return "default";
};

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("uz-UZ", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(amount);
};

const Payment = () => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  const getStatusTag = (status: string) => {
    const map: any = {
      pending: {
        color: "gold",
        label: i18n.language === "ru" ? "В ожидании" : "Kutilmoqda",
      },
      completed: {
        color: "green",
        label: i18n.language === "ru" ? "Подтверждено" : "Tasdiqlangan",
      },
      failed: {
        color: "red",
        label: i18n.language === "ru" ? "Отменено" : "Bekor qilingan",
      },
    };

    return <Tag color={map[status]?.color}>{map[status]?.label}</Tag>;
  };

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // KERAKLI MAYDONLAR (asosiy + muhim qo'shimchalar):
  const columns: ColumnsType<PaymentsData> = useMemo(
    () => [
      {
        title: "T/r",
        key: "index",
        width: "50px",
        render: (_: any, __: any, idx: number) => <div>{idx + 1}</div>,
      },
      {
        title: i18n.language === "ru" ? "Ученик" : "O'quvchi",
        dataIndex: "student_name",
        key: "student_name",
        render: (v: string) => v || "-",
      },
      {
        title:
          i18n.language === "ru"
            ? `Сумма (${t("sum")})`
            : `Summa (${t("sum")})`,
        width: "120px",
        render: (_, record) => (
          <div>
            <Text strong>{formatAmount(Number(record?.amount))}</Text>
            {record.original_amount !== record.amount && (
              <div>
                <Text delete type="secondary">
                  {formatAmount(Number(record.original_amount))}
                </Text>
              </div>
            )}
          </div>
        ),
      },
      {
        title: i18n.language === "ru" ? "Скидка" : "Chegirma",
        render: (_, record) =>
          record.discount_percent > 0 ? `${record.discount_percent}%` : "-",
      },
      {
        title: i18n.language === "ru" ? "Купон" : "Kupon",
        render: (_, record) =>
          record.coupon_code ? (
            <div>
              <Tag>{record.coupon_code}</Tag>
              <div style={{ fontSize: 12, color: "#999" }}>
                ({record.coupon_type})
              </div>
            </div>
          ) : (
            "-"
          ),
      },
      {
        title: t("status"),
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <Tag color={statusColor(status)} style={{ fontWeight: 700 }}>
            {status === "success" ? t("success") : t("cancelled")}
          </Tag>
        ),
      },
      {
        title: i18n.language === "ru" ? "Способ оплаты" : "To'lov usuli",
        dataIndex: "payment_gateway",
        key: "payment_gateway",
        render: (val: string) => (
          <span style={{ textTransform: "capitalize" }}>{val}</span>
        ),
      },
      {
        title:
          i18n.language === "ru"
            ? `Кешбэк (Учитель) ${t("sum")}`
            : `Cashback (O'qituvchi) ${t("sum")}`,
        width: "200px",
        render: (_, record) =>
          formatAmount(Number(record.teacher_cashback_amount)),
      },
      {
        title: t("childPhone") || "Telefon",
        dataIndex: "student_phone",
        key: "student_phone",
        render: (v: string) => v || "-",
      },
      {
        title: t("planName") || "Tarif",
        dataIndex: "plan_name",
        key: "plan_name",
        width: "100px",
        render: (v: string) => v || "-",
      },
      {
        title: i18n.language === "ru" ? "Дата платежа" : "To'lov sanasi",
        dataIndex: "payment_date",
        key: "payment_date",
        render: (v: string) => formatDateColumn(v),
      },
      {
        title: t("createdAt") || "Yaratilgan",
        dataIndex: "created_at",
        key: "created_at",
        render: (v: string) => formatDateColumn(v),
      },
      {
        title: t("actions"),
        key: "actions",
        width: "80px",
        render: (v: any, d: PaymentsData) => (
          <Popconfirm
            title={t("paymentAreYouSure")}
            onConfirm={() => handleDelete(d.id)}
            okText={t("yes")}
            cancelText={t("no")}
          >
            <Tooltip title={t("delete")}>
              <Button type="primary" danger size="small">
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Popconfirm>
        ),
      },
    ],
    [t],
  );

  const handleDelete = (id: number) => {
    deletePayments(id)
      .then(() => {
        toast.success(t("deleted"));
        queryClient.invalidateQueries({ queryKey: ["payments"] });
      })
      .catch(() => {
        toast.error(t("deleteFailed"));
      });
  };

  const dataSource = useMemo(() => {
    return data?.map((item: PaymentsData) => ({ ...item, key: item.id }));
  }, [data]);

  return (
    <Card title={t("payments")}>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1200 }}
        pagination={false}
      />
    </Card>
  );
};

export default Payment;
