import { getStudentsSubjectsChapters } from "@/services/student/diagnost-students";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";
import { Card, Spin, Table, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StudentSubjectDetails = () => {
  const { id, subjectId } = useParams();
  const { t, i18n } = useTranslation();

  const [selectedChapter, setSelectedChapter] = useState<any>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["student-subjects-chapters", id, subjectId],
    queryFn: async () => {
      const res = await getStudentsSubjectsChapters(
        Number(id),
        Number(subjectId),
      );
      return res;
    },
    enabled: !!id && !!subjectId,
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  useEffect(() => {
    if (data?.length) {
      setSelectedChapter(data[0]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spin />
      </div>
    );
  }

  //  CHAPTERS COLUMNS
  const chapterColumns = [
    {
      title: "#",
      render: (_: any, __: any, index: number) => index + 1,
      width: 60,
    },
    {
      title: t("title"),
      render: (row: any) =>
        i18n.language === "ru" ? row.chapter_name_ru : row.chapter_name_uz,
    },
    {
      title: t("mastery"),
      render: (row: any) => {
        const percent = row.progress || 0;
        return (
          <div className="flex items-center gap-2">
            <Progress percent={percent} size="small" showInfo={false} />
            <span>{percent}%</span>
          </div>
        );
      },
    },
  ];

  //  TOPICS COLUMNS
  const topicColumns = [
    {
      title: "#",
      render: (_: any, __: any, index: number) => index + 1,
      width: 60,
    },
    {
      title: t("title"),
      render: (row: any) =>
        i18n.language === "ru" ? row.topic_name_ru : row.topic_name_uz,
    },
    {
      title: t("mastery"),
      width: 260,
      render: (row: any) => {
        const percent = row.score_percent || 0;
        return (
          <div className="flex items-center gap-2">
            <Progress percent={percent} size="small" showInfo={false} />
            <span>{percent}%</span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/*  CHAPTERS TABLE */}
      <div className="lg:col-span-5">
        <Card
          title={
            <div className="px-4 py-3 ">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-md">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 uppercase">
                    {t("chapters")}
                  </h3>
                  <p className="text-xs text-gray-500">{t("select")}</p>
                </div>
              </div>
            </div>
          }
        >
          <Table
            rowKey="chapter_id"
            columns={chapterColumns}
            dataSource={data}
            pagination={false}
            onRow={(record) => ({
              onClick: () => setSelectedChapter(record),
            })}
            rowClassName={(record) =>
              `cursor-pointer ${
                record.chapter_id === selectedChapter?.chapter_id
                  ? "bg-blue-50"
                  : ""
              }`
            }
          />
        </Card>
      </div>

      {/*  TOPICS TABLE */}
      <div className="lg:col-span-7">
        <Card
          title={
            <div className="px-4 py-3  ">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-md">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 uppercase">
                    {t("topic")}
                  </h3>
                  <p className="text-xs text-gray-500">{t("topicsList")}</p>
                </div>
              </div>
            </div>
          }
        >
          <Table
            rowKey="topic_id"
            columns={topicColumns}
            dataSource={selectedChapter?.topics || []}
            pagination={false}
          />
        </Card>
      </div>
    </div>
  );
};

export default StudentSubjectDetails;
