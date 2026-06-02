import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, Table, Button, Space, message, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  deleteWithDrawalSetting,
  getWithDrawalSettings,
  WithDrawalSettingsData,
} from "@/services";
import WithdrawalModal from "../components/WithdrawalModal";

const WithDrawal = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] =
    useState<WithDrawalSettingsData | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["data-withdrawal"],
    queryFn: getWithDrawalSettings,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteWithDrawalSetting(id),
    onSuccess: (response) => {
      // if ("success" in response.data) {
      //   message.success(response.data.success);
      // }
      queryClient.invalidateQueries({ queryKey: ["data-withdrawal"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || t("DeleteFailed"));
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (record: WithDrawalSettingsData) => {
    setEditingRecord(record);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingRecord(null);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingRecord(null);
  };

  const columns = [
    {
      title: t("ID"),
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: t("MinAmount"),
      dataIndex: "min_amount",
      key: "min_amount",
      render: (value: number) => `${value.toLocaleString()} so'm`,
    },
    {
      title: t("MaxAmount"),
      dataIndex: "max_amount",
      key: "max_amount",
      render: (value: number) => `${value.toLocaleString()} so'm`,
    },
    {
      title: t("UpdatedAt"),
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: t("actions"),
      key: "actions",
      render: (_: any, record: WithDrawalSettingsData) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          ></Button>
          <Popconfirm
            title={t("deleteConfirm")}
            description={t("deleteConfirmMessage")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("yes")}
            cancelText={t("no")}
          >
            <Button danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataSource = data?.results || [];

  return (
    <>
      <Card
        title={t("WithdrawalSettings")}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            {t("adding")}
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
          rowKey="id"
          pagination={false}
        />
      </Card>

      {/* <WithdrawalModal
        visible={modalVisible}
        onClose={handleModalClose}
        editingRecord={editingRecord}
      /> */}
    </>
  );
};

export default WithDrawal;
