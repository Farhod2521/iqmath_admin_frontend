import {
  getDiagnostStudentsSubjects,
  getStudentsSubjects,
} from "@/services/student/diagnost-students";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";
import { Card, Table, Tabs, Progress, Button, Spin } from "antd";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EyeOutlined } from "@ant-design/icons";

const StudentSubjectsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // MASTER SUBJECTS
  const {
    data: subjectsData,
    isLoading: loading1,
    error: error1,
  } = useQuery({
    queryKey: ["students-subjects", id],
    queryFn: () => getStudentsSubjects(Number(id)),
    enabled: !!id,
  });

  // DIAGNOST SUBJECTS
  const {
    data: diagnostData,
    isLoading: loading2,
    error: error2,
  } = useQuery({
    queryKey: ["diagnost-students-subjects", id],
    queryFn: () => getDiagnostStudentsSubjects(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (error1) handleApiError(error1);
    if (error2) handleApiError(error2);
  }, [error1, error2]);

  if (loading1 || loading2) {
    return (
      <div className="flex justify-center py-10">
        <Spin />
      </div>
    );
  }

  const subjects = subjectsData || [];
  const subjectsD = diagnostData || [];

  // COMMON COLUMNS
  const columns = [
    {
      title: t("subjectName"),
      render: (row: any) =>
        i18n.language === "ru" ? row.name_ru : row.name_uz,
    },
    {
      title: t("class"),
      dataIndex: "class_name",
      align: "center",
    },
    {
      title: t("mastery"),
      render: (row: any) => {
        const percent = row.mastery_percent || 0;

        return (
          <div className="flex items-center gap-2">
            <Progress
              percent={percent}
              size="small"
              showInfo={false}
              strokeColor="#1677ff"
            />
            <span className="text-sm font-medium">{percent}%</span>
          </div>
        );
      },
    },
    {
      title: t("action"),
      align: "center",
      render: (row: any) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/users/pupils/${id}/${row.id}`)}
        />
      ),
    },
  ];

  return (
    <Card className="rounded-2xl">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label:
              i18n.language === "ru"
                ? "Освоение по предметам"
                : "Fanlar bo'yicha o'zlashtirish",
            children: (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={subjects}
                pagination={false}
                size="small"
              />
            ),
          },
          {
            key: "2",
            label: i18n.language === "ru" ? "Диагностика" : "Diagnostika",
            children: (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={subjectsD}
                pagination={false}
                size="small"
              />
            ),
          },
        ]}
      />
    </Card>
  );
};

export default StudentSubjectsList;
