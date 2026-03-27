import { Card, Table } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const ConversionRates = () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: "1 tangaga teng ball miqdori",
      key: "tenge",
      dataIndex: "tenge",
    },
    {
      title: "1 tangaga teng pul miqdori",
      key: "money",
      dataIndex: "money",
    },
    {
      title: "O'zgargan vaqti",
      key: "update_at",
      dataIndex: "update_at",
    },
  ];
  return (
    <Card title="Konversiya kurslari">
      <Table columns={columns} bordered size="small" pagination={false} />
    </Card>
  );
};

export default ConversionRates;
