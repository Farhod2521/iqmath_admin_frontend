import { postStudenttop, StudentTopResutsDataList } from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import { Card, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Ratings = () => {
  const { t } = useTranslation();
  const [type, setType] = useState("coin");
  const [topCount, setTopCount] = useState(10);
  const [data, setData] = useState<StudentTopResutsDataList[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDataStudentTop = () => {
    setIsLoading(true);
    postStudenttop({
      top_count: topCount,
      type,
    })
      .then((res) => {
        setData(res?.results);
      })
      .catch((err) => handleApiError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDataStudentTop();
  }, [type, topCount]);

  const optiontsType = [
    { label: t("topBall"), value: "score" },
    { label: t("topTanga"), value: "coin" },
    { label: t("topSum"), value: "som" },
  ];

  const optiontsCount = [
    { label: t("10"), value: 10 },
    { label: t("20"), value: 20 },
    { label: t("50"), value: 50 },
    { label: t("100"), value: 100 },
    { label: t("1000"), value: 1000 },
  ];

  const columns = [
    {
      title: "#",
      render: (_: any, __: any, index: number) => index + 1,
      width: "10px",
    },
    {
      title: t("fullName"),
      dataIndex: "full_name",
    },
    {
      title: t("phone"),
      dataIndex: "phone",
    },
    {
      title: t("score"),
      dataIndex: "score",
    },
    {
      title: t("coin"),
      dataIndex: "coin",
    },
    {
      title: t("sum"),
      dataIndex: "som",
    },
  ];

  return (
    <Card title={t("ratings")}>
      <div className="mb-4 flex items-center gap-5">
        <Select
          options={optiontsType}
          value={type}
          onChange={(e) => setType(e)}
          style={{ width: 150 }}
        />
        <Select
          options={optiontsCount}
          value={topCount}
          onChange={(e) => setTopCount(e)}
          style={{ width: 150 }}
        />
      </div>

      <Table
        rowKey="student_id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        bordered
      />
    </Card>
  );
};

export default Ratings;
