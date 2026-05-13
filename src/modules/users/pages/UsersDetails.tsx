import { postUsersUniversalStatistics } from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";
import { Card, Tag, Button, Row, Col, Statistic, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StudentSubjectsList from "../components/StudentSubjectsList";
import RewardModal from "../components/RewardModal";

const UsersDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role")?.toLowerCase();
  const normalizedRole = role?.toLowerCase();

  const [isRewardOpen, setIsRewardOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users-universal-statistics", id, normalizedRole],
    queryFn: async () => {
      const res = await postUsersUniversalStatistics(Number(id), {
        role: normalizedRole,
      });
      return res;
    },
    enabled: !!id && !!normalizedRole,
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-75">
        <Spin />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <Card className="rounded-2xl">
        <div className="flex justify-between items-center">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-xl font-bold text-indigo-600">
              {data.full_name?.[0]}
            </div>

            <div>
              <h2 className="text-lg font-semibold">{data.full_name}</h2>
              <p className="text-sm text-gray-500">
                {t("id")}: {data.identification}
              </p>
              <p className="text-sm text-gray-500">
                {t("phone")}: {data.phone}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <Tag color={data.is_active ? "green" : "red"}>
              {data.is_active ? t("active") : t("inactive")}
            </Tag>

            {normalizedRole === "student" && (
              <Button type="primary" onClick={() => setIsRewardOpen(true)}>
                {t("giveReward")}
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* STATS */}
      {normalizedRole === "student" && (
        <Card
          className="rounded-2xl mt-2!"
          title={<p className="font-semibold">{t("paymentInfo")}</p>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* LAST PAYMENT */}
            <div>
              <p className="text-sm text-gray-500">{t("lastPayment")}</p>

              <p className="font-semibold text-lg">
                {data?.last_payment_amount?.toLocaleString()} UZS
              </p>

              <p className="text-xs text-gray-400">
                {data?.last_payment_date} {data?.last_payment_time}
              </p>
            </div>

            {/* TOTAL */}
            <div>
              <p className="text-sm text-gray-500">{t("total")}</p>

              <p className="font-semibold text-lg">
                {data?.total_paid_amount?.toLocaleString()} UZS
              </p>
            </div>

            {/* PAYMENT STATUS */}
            <div>
              <p className="text-sm text-gray-500">{t("paymentStatus")}</p>

              <div className="flex flex-col gap-1 mt-1">
                <span className="flex items-center text-sm text-yellow-600">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2" />
                  {data?.payment_status_count?.pending} {t("pending")}
                </span>

                <span className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2" />
                  {data?.payment_status_count?.success} {t("success")}
                </span>

                <span className="flex items-center text-sm text-red-600">
                  <div className="w-2 h-2 rounded-full bg-red-400 mr-2" />
                  {data?.payment_status_count?.failed} {t("failed")}
                </span>

                <span className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-gray-400 mr-2" />
                  {data?.is_active ? t("active") : t("inactive")}
                </span>
              </div>
            </div>

            {/* COIN */}
            <div>
              <p className="text-sm text-gray-500">{t("coins")}</p>

              <p className="font-semibold text-lg">{data?.coin}</p>
            </div>

            {/* SCORE */}
            <div>
              <p className="text-sm text-gray-500">{t("SumScore")}</p>

              <p className="font-semibold text-lg">{data?.score}</p>
            </div>
          </div>
        </Card>
      )}

      {/* PARENT VIEW */}
      {normalizedRole === "parent" && (
        <Card className="rounded-2xl">
          <h3 className="font-semibold mb-4">
            {t("myChildren")} ({data.children_count})
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {data.children?.map((child: any) => (
              <Card
                key={child.student_id}
                className="hover:shadow-md transition"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">{child.full_name}</h3>

                  <Tag color={child.is_active ? "green" : "red"}>
                    {child.is_active ? t("active") : t("inactive")}
                  </Tag>
                </div>

                <p className="text-sm text-gray-500 mb-1">
                  {t("subject")}: {child.class_name}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {t("phone")}: {child.phone}
                </p>

                <Row gutter={8}>
                  <Col span={8}>
                    <Statistic title={t("score")} value={child.score} />
                  </Col>
                  <Col span={8}>
                    <Statistic title={t("coins")} value={child.coin} />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title={t("remainingDays")}
                      value={child.remaining_days}
                    />
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* TUTOR VIEW */}
      {normalizedRole === "tutor" && (
        <div className="flex flex-col gap-2 mt-2">
          <Card className="rounded-2xl">
            <h3 className="font-semibold mb-4">
              {t("referralStudents")} ({data.referral_students_count})
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.referral_students?.length === 0 ? (
                <p className="text-gray-400 text-sm">{t("noData")}</p>
              ) : (
                <>
                  {data.referral_students?.map((student) => (
                    <div
                      key={student.student_id}
                      className="border rounded-xl p-4"
                    >
                      <h3 className="font-semibold">{student.full_name}</h3>
                      <p className="text-sm text-gray-500">{student.phone}</p>

                      <Row gutter={8} className="mt-3">
                        <Col span={12}>
                          <Statistic
                            title={t("paymentAmount")}
                            value={student.payment_amount}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title={t("bonusAmount")}
                            value={student.bonus_amount}
                          />
                        </Col>
                      </Row>
                    </div>
                  ))}
                </>
              )}
            </div>
          </Card>
          <Card className="bg-white p-6 rounded-xl border">
            <h2 className="font-semibold mb-4">
              {t("couponStudents")} ({data.coupon_students_count})
            </h2>

            {data.coupon_students?.length === 0 ? (
              <p className="text-gray-400 text-sm">{t("noData")}</p>
            ) : (
              <div className="space-y-3">
                {data.coupon_students.map((student) => (
                  <div
                    key={student.student_id}
                    className="border rounded-lg p-4"
                  >
                    <h3 className="font-semibold">{student.full_name}</h3>
                    <p className="text-sm text-gray-500">{student.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* ================= STUDENT VIEW ================= */}
      {normalizedRole === "student" && <StudentSubjectsList />}

      <RewardModal
        open={isRewardOpen}
        close={() => setIsRewardOpen(false)}
        selectedStudent={{ id, full_name: data.full_name }}
      />
    </div>
  );
};

export default UsersDetails;
