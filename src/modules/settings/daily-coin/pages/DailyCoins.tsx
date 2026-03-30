import {
  getDailyCoinSettings,
  postDailyCoinSettings,
  deleteDailyCoinSettings,
  DailyCoinData,
} from "@/services";
import {
  Card,
  Table,
  Tag,
  Button,
  InputNumber,
  Popconfirm,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";

const DailyCoins: React.FC = () => {
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

    try {
      await postDailyCoinSettings(id, {
        daily_coin_limit: value,
      });
      message.success("Yangilandi");
      setEditingId(null);
      fetchData();
    } catch {
      message.error("Xatolik yuz berdi");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDailyCoinSettings(id);
      message.success("O‘chirildi");
      fetchData();
    } catch {
      message.error("Xatolik yuz berdi");
    }
  };

  const columns: ColumnsType<DailyCoinData> = [
    {
      title: "#",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Kunlik coin limiti",
      dataIndex: "daily_coin_limit",
      render: (value: number, record: DailyCoinData) => {
        if (editingId === record.id) {
          return (
            <InputNumber
              min={0}
              value={value}
              onChange={(val) => setValue(val ?? 0)}
            />
          );
        }
        return <Tag color="blue">{value}</Tag>;
      },
    },
    {
      title: "Yangilangan vaqt",
      dataIndex: "updated_at",
      render: (value: string) =>
        value ? value.replace("T", " ").slice(0, 16) : "-",
    },
    {
      title: "Action",
      render: (_: unknown, record: DailyCoinData) => {
        if (editingId === record.id) {
          return (
            <div className="flex gap-2">
              <Button type="primary" onClick={() => handleSave(record.id)}>
                Saqlash
              </Button>
              <Button onClick={() => setEditingId(null)}>Bekor qilish</Button>
            </div>
          );
        }

        return (
          <div className="flex gap-2">
            <Button onClick={() => handleEdit(record)}>Tahrirlash</Button>

            <Popconfirm
              title="Rostdan ham o‘chirmoqchimisiz?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button danger>O‘chirish</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <Card title="Kunlik coin sozlamalari">
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
