import {
  getDailyCoinSettings,
  postDailyCoinSettings,
  deleteDailyCoinSettings,
  DailyCoinData,
} from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import { DeleteOutlined } from "@ant-design/icons";
import { Card, Table, Tag, Button, InputNumber, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const DailyCoins: React.FC = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<DailyCoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [value, setValue] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getDailyCoinSettings();
      setData(res || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record: DailyCoinData) => {
    setEditingId(record.id);
    setValue(record.daily_coin_limit);
  };

  const handleSave = async (id: number) => {
    if (value === null) return;

    await postDailyCoinSettings(id, {
      daily_coin_limit: value,
    })
      .then(() => {
        toast.success(t("dailyCoinSettings.updated"));
        setEditingId(null);
        fetchData();
      })
      .catch((err) => handleApiError(err));
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDailyCoinSettings(id);
      toast.success(t("dailyCoinSettings.deleted"));
      fetchData();
    } catch {
      toast.error(t("dailyCoinSettings.errorOccurred"));
    }
  };

  const columns: ColumnsType<DailyCoinData> = [
    {
      title: t("scoreLog.tR"),
      render: (_, __, index) => index + 1,
    },
    {
      title: t("dailyCoinSettings.dailyCoinLimit"),
      dataIndex: "daily_coin_limit",
      render: (val: number, record: DailyCoinData) => {
        if (editingId === record.id) {
          return (
            <InputNumber
              min={0}
              value={val}
              onChange={(v) => setValue(v ?? 0)}
            />
          );
        }
        return <Tag color="blue">{val}</Tag>;
      },
    },
    {
      title: t("dailyCoinSettings.updatedTime"),
      dataIndex: "updated_at",
      render: (value: string) =>
        value ? value.replace("T", " ").slice(0, 16) : "-",
    },
    {
      title: t("action"),
      render: (_: unknown, record: DailyCoinData) => {
        if (editingId === record.id) {
          return (
            <div className="flex gap-2">
              <Button type="primary" onClick={() => handleSave(record.id)}>
                {t("save")}
              </Button>
              <Button onClick={() => setEditingId(null)}>{t("cancel")}</Button>
            </div>
          );
        }

        return (
          <div className="flex gap-2">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleEdit(record)}
            >
              <FaEdit />
            </Button>

            <Popconfirm
              title={t("confirmDelete")}
              onConfirm={() => handleDelete(record.id)}
            >
              <Button size="small" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <Card title={t("dailyCoinSettings.dailyCoinSettings")}>
      <Table<DailyCoinData>
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
      />
    </Card>
  );
};

export default DailyCoins;