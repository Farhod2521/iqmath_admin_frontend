import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Popconfirm, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { deletePayments, getPayments, PaymentsData } from "../services";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import { handleApiError } from "@/shared/utils/handleApiError";

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

const Payment = () => {
  const { t } = useTranslation();
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

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  const columns = useMemo(
    () => [
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
        title: t("status"),
        dataIndex: "status",
        key: "status",

        render: (status: string) => (
          <Tag color={statusColor(status)} style={{ fontWeight: 700 }}>
            {status || "-"}
          </Tag>
        ),
      },
      {
        title: t("amount"),
        dataIndex: "amount",
        key: "amount",

        render: (v: string) => `${formatMoney(v)} so'm`,
      },
      {
        title: t("paymentGateway"),
        dataIndex: "payment_gateway",
        key: "payment_gateway",

        render: (v: string) => v || "-",
      },
      {
        title: t("paymentDate"),
        dataIndex: "payment_date",
        key: "payment_date",

        render: (v: string) => formatDateColumn(v),
      },
      {
        title: t("actions"),
        dataIndex: "actions",
        key: "actions",
        width: "10px",
        render: (v: any, d: PaymentsData) => {
          return (
            <Popconfirm
              title={t("paymentAreYouSure")}
              onConfirm={() => handleDelete(d.id)}
              okText={t("yes")}
              cancelText={t("no")}
            >
              <Tooltip title={t("delete")}>
                <Button type="primary" danger>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </Popconfirm>
          );
        },
      },

      //   {
      //     title: t("student"),
      //     dataIndex: "student",
      //     key: "student",
      //     width: 100,
      //     render: (v: number) => v ?? "-",
      //   },
      //   {
      //     title: "Store",
      //     dataIndex: "store_id",
      //     key: "store_id",
      //     width: 90,
      //     render: (v: string | null) => v || "-",
      //   },
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
        pagination={false}
        scroll={{ x: 900 }}
      />
    </Card>
  );
};

export default Payment;
