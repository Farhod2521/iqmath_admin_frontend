import { Card, Table } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const Groups = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("title"),
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: t("permissions"),
      dataIndex: "permissions",
      key: "permissions",
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
    },
    {
      title: t("createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: t("updatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];

  return (
    <Card title={t("groups")}>
      <Table columns={columns} dataSource={[]} pagination={false} />
    </Card>
  );
};

export default Groups;
