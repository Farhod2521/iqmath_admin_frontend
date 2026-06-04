import { getTeacherFine, getUsers } from "@/services";
import FAutoSelect from "@/shared/components/filters/FAutoSelect";
import SelectInfinite from "@/shared/components/selects/SelectInfinite";
import { useOptions } from "@/shared/hooks";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";
import { Card, Select, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Fine = () => {
  const { t } = useTranslation();
  const { fineTypeOptions } = useOptions();
  const [filterData, setFilterData] = useState({
    student_id: undefined,
    given_by_id: undefined,
    fine_type: undefined,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["data-fine", filterData],
    queryFn: () => getTeacherFine(filterData),
  });

  useEffect(() => {
    if (error) {
      handleApiError(error);
    }
  }, [error]);

  const columns = [
    {
      title: t("tR"),
      key: "id",
      width: "10px",
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: t("student"),
      dataIndex: ["student", "full_name"],
      key: "student",
      render: (_: any, record: any) => record?.student?.full_name || "---",
    },
    {
      title: t("teachers"),
      dataIndex: ["given_by", "full_name"],
      key: "given_by",
      render: (_: any, record: any) => record?.given_by?.full_name || "---",
    },
    {
      title: t("type"),
      dataIndex: "fine_type",
      key: "fine_type",
      render: (value: string, record: any) => {
        const color =
          value === "coin" ? "gold" : value === "score" ? "green" : "blue";

        return <Tag color={color}>{record?.fine_type_display}</Tag>;
      },
    },

    {
      title: t("amount"),
      dataIndex: "amount",
      key: "amount",
      width: 100,
      render: (value: number) => <span className="font-semibold">{value}</span>,
    },
    {
      title: t("reason"),
      dataIndex: "reason",
      key: "reason",
      render: (value: string) => (
        <span className="line-clamp-2">{value || "---"}</span>
      ),
    },
    {
      title: t("createdAt"),
      dataIndex: "created_at",
      key: "created_at",
      width: 160,
    },
  ];

  return (
    <Card title={t("fines")}>
      <div className="flex items-center gap-2 mb-2">
        {" "}
        <SelectInfinite
          className="w-full"
          size="middle"
          style={{ width: 200 }}
          queryKey={(search) => ["fine-student", search]}
          queryFn={() =>
            getUsers({
              page: 1,
              size: 100,
              role: "student",
              status: "active",
            })
          }
          getOptions={(data) =>
            data?.results?.map((item) => ({
              label: item.full_name,
              value: item.id,
            })) || []
          }
          getTotal={(data) => data?.total || 1000}
          value={filterData?.student_id}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              student_id: value,
            }))
          }
          placeholder={t("students")}
          allowClear
        />{" "}
        <SelectInfinite
          className="w-full"
          size="middle"
          style={{ width: 200 }}
          queryKey={(search) => ["fine-teacher", search]}
          queryFn={() =>
            getUsers({
              page: 1,
              size: 100,
              role: "teacher",
              status: "active",
            })
          }
          getOptions={(data) =>
            data?.results?.map((item) => ({
              label: item.full_name,
              value: item.id,
            })) || []
          }
          getTotal={(data) => data?.total || 1000}
          value={filterData?.given_by_id}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              given_by_id: value,
            }))
          }
          placeholder={t("teachers")}
          allowClear
        />{" "}
        <Select
          allowClear
          loading={isLoading}
          className="w-full"
          style={{ width: 200 }}
          placeholder={t("scoreLog.awardType")}
          value={filterData.fine_type}
          options={fineTypeOptions}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              fine_type: value,
            }))
          }
        />
      </div>
      <Table dataSource={data?.results} columns={columns} pagination={false} />
    </Card>
  );
};

export default Fine;
