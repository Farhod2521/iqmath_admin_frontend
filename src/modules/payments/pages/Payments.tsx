import { formatDateColumn } from "@/shared/components/tables/formatters";
import { Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { getPaymentsStudent } from "../services";
import { useQuery } from "@tanstack/react-query";

const { Text } = Typography;

type PaymentType = {
  id: number;
  student_name: string;
  amount: number;
  original_amount: number;
  discount_percent: number;
  coupon_code?: string;
  coupon_type?: string;
  status: "pending" | "completed" | "failed";
  payment_gateway: string;
  teacher_cashback_amount: number;
  created_at: string;
  payment_date: string;
};

const Payments = () => {
  const { t, i18n } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["payments-list"],
    queryFn: getPaymentsStudent,
  });

  const payments = data || [];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(amount);
  };

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

  const columns: ColumnsType<PaymentType> = [
    {
      title: "T/r",
      dataIndex: "id",
      key: "id",
      width: "50px",
      render: (rol: string, d: any, idx: number) => {
        return <div>{idx + 1}</div>;
      },
    },
    {
      title: i18n.language === "ru" ? "Ученик" : "O'quvchi",
      dataIndex: "student_name",
    },
    {
      title:
        i18n.language === "ru" ? `Сумма (${t("sum")})` : `Summa (${t("sum")})`,
      render: (_, record) => (
        <div>
          <Text strong>{formatAmount(record.amount)}</Text>
          {record.original_amount !== record.amount && (
            <div>
              <Text delete type="secondary">
                {formatAmount(record.original_amount)}
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
      title: i18n.language === "ru" ? "Статус" : "Holati",
      render: (_, record) => getStatusTag(record.status),
    },
    {
      title: i18n.language === "ru" ? "Способ оплаты" : "To'lov usuli",
      dataIndex: "payment_gateway",
      render: (val: string) => (
        <span style={{ textTransform: "capitalize" }}>{val}</span>
      ),
    },
    {
      title:
        i18n.language === "ru"
          ? `Кешбэк (Учитель) ${t("sum")}`
          : `Cashback (O'qituvchi) ${t("sum")}`,
      render: (_, record) => formatAmount(record.teacher_cashback_amount),
    },
    {
      title: i18n.language === "ru" ? "Дата создания" : "Yaratilgan sana",
      dataIndex: "created_at",
      render: (val: string) => formatDateColumn(val),
    },
    {
      title: i18n.language === "ru" ? "Дата платежа" : "To'lov sanasi",
      dataIndex: "payment_date",
      render: (val: string) => formatDateColumn(val),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={payments || []}
      columns={columns}
      pagination={false}
      scroll={{ x: 800 }}
      bordered
      locale={{
        emptyText:
          i18n.language === "ru"
            ? "Платежная информация не найдена"
            : "Hech qanday to'lov ma'lumoti topilmadi",
      }}
    />
  );
};

export default Payments;
