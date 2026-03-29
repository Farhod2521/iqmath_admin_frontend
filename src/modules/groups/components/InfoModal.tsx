// components/InfoModal.tsx
import { Modal, Spin, Empty, Divider } from "antd";

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
      destroyOnClose
    >
      {loading ? (
        <div className="py-8 text-center">
          <Spin />
        </div>
      ) : !groupDetail ? (
        <Empty description="Ma'lumot topilmadi" />
      ) : (
        <>
          <div className="text-lg font-semibold">{groupDetail.name}</div>
          <div className="text-gray-500">ID: {groupDetail.id}</div>

          <Divider />

          <div className="font-semibold mb-2">
            Mavjud studentlar (
            {Array.isArray(groupDetail.students)
              ? groupDetail.students.length
              : 0}
            )
          </div>

          {Array.isArray(groupDetail?.students) &&
          groupDetail?.students.length > 0 ? (
            <div className="space-y-2">
              {groupDetail?.students.map((s: any) => (
                <div
                  key={s.id ?? `${s?.full_name}-${Math.random()}`}
                  className="border rounded-lg px-3 py-2"
                >
                  <div className="font-medium">
                    {s.full_name ||
                      `${s.first_name ?? ""} ${s.last_name ?? ""}`.trim() ||
                      "Noma'lum"}
                  </div>
                  {s.phone ? (
                    <div className="text-xs text-gray-500">{s.phone}</div>
                  ) : null}
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
