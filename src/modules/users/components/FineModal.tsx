import { Modal, Form, Input, InputNumber, Select } from "antd";
import { useMutation } from "@tanstack/react-query";
import { postTeacherFine, StudentData, TeacherFineFormData } from "@/services";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useOptions } from "@/shared/hooks";

type Props = {
  open: boolean;
  close: () => void;
  student: StudentData | undefined;
  onSuccess: any;
};

const FineModal = ({ open, close, student, onSuccess }: Props) => {
  const { fineTypeOptions } = useOptions();

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const fineMutation = useMutation({
    mutationFn: postTeacherFine,
    onSuccess: (res: any) => {
      toast.success(res?.message);
      form.resetFields();
      close();
      onSuccess?.();
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  return (
    <Modal
      open={open}
      onCancel={close}
      okText={t("save")}
      cancelText={t("cancel")}
      onOk={() => form.submit()}
      title={t("issueFine")}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          if (!student) return;

          const payload: TeacherFineFormData = {
            student_id: student.id,
            fine_type: values.fine_type,
            amount: values.amount,
            reason: values.reason,
          };

          fineMutation.mutate(payload);
        }}
      >
        <Form.Item
          name="fine_type"
          label={t("fineType")}
          rules={[{ required: true, message: t("required") }]}
        >
          <Select options={fineTypeOptions} placeholder={t("selectFineType")} />
        </Form.Item>

        <Form.Item
          name="amount"
          label={t("amount")}
          rules={[{ required: true, message: t("required") }]}
        >
          <InputNumber className="w-full!" min={0} placeholder={t("amount")} />
        </Form.Item>

        <Form.Item
          name="reason"
          label={t("reason")}
          rules={[{ required: true, message: t("required") }]}
        >
          <Input.TextArea rows={3} placeholder={t("reason")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FineModal;
