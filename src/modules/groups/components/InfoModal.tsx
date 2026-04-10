import { Modal, Spin, Empty, Divider, Tag } from "antd";
import { useTranslation } from "react-i18next";

interface InfoModalProps {
  open: boolean;
  loading: boolean;
  groupDetail: any;
  onCancel: () => void;
}

export const InfoModal = ({
  open,
  loading,
  groupDetail,
  onCancel,
}: InfoModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      title={t("groupInfo")}
      open={open}
      onCancel={onCancel}
      onOk={onCancel}
      okText={t("close")}
      cancelText={t("cancel")}
      width={600}
    >
      {loading ? (
        <div className="py-10 text-center">
          <Spin />
        </div>
      ) : !groupDetail ? (
        <Empty description={t("noDataFound")} />
      ) : (
        <>
          {/* 🔷 HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold m-0">{groupDetail.name}</h2>
            </div>

            <Tag color="blue" className="text-sm px-3 py-1 rounded-full">
              {groupDetail.student_count} {t("msgResult.moreCount")}{" "}
              {t("student")}
            </Tag>
          </div>

          {/* 🔷 INFO GRID */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 m-0">{t("tutor")}</p>
              <p className="font-medium text-gray-800 m-0">
                {groupDetail.teacher_name || "—"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 m-0">{t("createdAt")}</p>
              <p className="font-medium text-gray-800 m-0">
                {groupDetail.created_at || "—"}
              </p>
            </div>
          </div>

          <Divider />

          {/* 🔷 STUDENTS */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold m-0">
              {t("students")} ({groupDetail.students?.length || 0})
            </h3>
          </div>

          {Array.isArray(groupDetail.students) &&
          groupDetail.students.length > 0 ? (
            <div className="space-y-2 max-h-[300px] overflow-auto pr-1">
              {groupDetail.students.map((s: any, index: number) => (
                <div
                  key={s.id ?? index}
                  className="flex items-center justify-between border rounded-xl px-4 py-3 hover:shadow-sm transition"
                >
                  <div>
                    <p className="font-medium text-gray-800 m-0">
                      {s.full_name ||
                        `${s.first_name ?? ""} ${s.last_name ?? ""}`.trim() ||
                        t("unknown")}
                    </p>

                    <p className="text-xs text-gray-400 m-0">
                      {t("id")}: {s.identification || s.id}
                    </p>
                  </div>

                  <Tag color="geekblue">{t("student")}</Tag>
                </div>
              ))}
            </div>
          ) : (
            <Empty description={t("student") + t("no")} />
          )}
        </>
      )}
    </Modal>
  );
};
