import { Modal, Spin, Empty, Divider, Tag } from "antd";

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
  return (
    <Modal
      title="Guruh tafsilotlari"
      open={open}
      onCancel={onCancel}
      onOk={onCancel}
      width={600}
      destroyOnClose
    >
      {loading ? (
        <div className="py-10 text-center">
          <Spin />
        </div>
      ) : !groupDetail ? (
        <Empty description="Ma'lumot topilmadi" />
      ) : (
        <>
          {/* 🔷 HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold m-0">{groupDetail.name}</h2>
            </div>

            <Tag color="blue" className="text-sm px-3 py-1 rounded-full">
              {groupDetail.student_count} ta student
            </Tag>
          </div>

          {/* 🔷 INFO GRID */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 m-0">O‘qituvchi</p>
              <p className="font-medium text-gray-800 m-0">
                {groupDetail.teacher_name || "—"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 m-0">Yaratilgan sana</p>
              <p className="font-medium text-gray-800 m-0">
                {groupDetail.created_at || "—"}
              </p>
            </div>
          </div>

          <Divider />

          {/* 🔷 STUDENTS */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold m-0">
              Studentlar ({groupDetail.students?.length || 0})
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
                        "Noma'lum"}
                    </p>

                    <p className="text-xs text-gray-400 m-0">
                      ID: {s.identification || s.id}
                    </p>
                  </div>

                  <Tag color="geekblue">Student</Tag>
                </div>
              ))}
            </div>
          ) : (
            <Empty description="Student yo‘q" />
          )}
        </>
      )}
    </Modal>
  );
};
