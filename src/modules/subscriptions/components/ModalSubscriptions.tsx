import { getStudentList } from "@/services";
import SelectInfinite from "@/shared/components/selects/SelectInfinite";
import { Button, DatePicker, Form, Input, Modal, Space, Switch } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  form: any;
  modalType: string;
  modalVisible: boolean;
  onClose: () => void;
  handleSubmit: any;
};

const getStudentQueryKey = (search: string) => [
  "new-students-without-group",
  search,
];

const getStudentListFn = ({ page, size }: { page: number; size: number }) =>
  getStudentList({ page, size, role: "student" });

const getStudentOptions = (data: any) =>
  data?.results?.map((item: any) => ({
    label: item.full_name,
    value: Number(item.id),
  })) || [];
const getStudentTotal = (data: any) => data?.total || 0;

const ModalSubscriptions = ({
  form,
  modalType,
  modalVisible,
  onClose,
  handleSubmit,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Modal
      title={
        modalType === "create"
          ? "Yangi obuna qo'shish"
          : modalType === "edit"
            ? "Obunani tahrirlash"
            : "Obuna ma'lumotlari"
      }
      open={modalVisible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={modalType === "view"}
      >
        {/* <Form.Item name="is_active" label={t("status")} valuePropName="checked">
          <Switch />
        </Form.Item> */}

        <Form.Item
          name="is_paid"
          label={t("paymentGateway")}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="student"
          label={t("student")}
          rules={[{ required: true, message: t("required") }]}
        >
          <SelectInfinite
            queryKey={getStudentQueryKey}
            queryFn={getStudentListFn}
            getOptions={getStudentOptions}
            getTotal={getStudentTotal}
            allowClear
            placeholder={t("selectStudents")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* <Form.Item
          name="student_phone"
          label={t("phone_number")}
          rules={[{ required: true, message: t("required") }]}
        >
          <Input placeholder="+998 XX XXX XX XX" />
        </Form.Item> */}

        <Form.Item
          name="start_date"
          label={t("startDate")}
          rules={[{ required: true, message: "Boshlanish sanasini tanlang" }]}
        >
          <DatePicker
            showTime
            format="DD.MM.YYYY HH:mm"
            style={{ width: "100%" }}
            placeholder="Boshlanish sanasini tanlang"
          />
        </Form.Item>

        <Form.Item
          name="end_date"
          label={t("endDate")}
          rules={[{ required: true, message: "Tugash sanasini tanlang" }]}
        >
          <DatePicker
            showTime
            format="DD.MM.YYYY HH:mm"
            style={{ width: "100%" }}
            placeholder="Tugash sanasini tanlang"
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {modalType === "create" ? t("adding") : t("save")}
            </Button>
            <Button onClick={onClose}>{t("cancel")}</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalSubscriptions;
