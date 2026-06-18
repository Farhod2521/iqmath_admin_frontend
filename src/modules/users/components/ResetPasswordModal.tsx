import { postUserRestPassword } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  close: () => void;
  selectedStudent?: any;
}

const ResetPasswordModal = ({ open, close, selectedStudent }: Props) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: postUserRestPassword,
    onSuccess: () => {
      toast.success(t("resetPasswordSuccess"));

      form.resetFields();
      close();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t("resetPasswordError"));
    },
  });

  const handleSubmit = (values: { new_password: string }) => {
    mutation.mutate({
      user_id: selectedStudent.user_id,
      new_password: values.new_password,
    });
  };

  return (
    <Modal
      title={t("resetPassword")}
      open={open}
      onCancel={close}
      footer={null}
      destroyOnClose
    >
      <div className="mb-4 ">
        <b className="text-[12px]">{t("user")}:</b> {selectedStudent?.full_name}
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label={t("newPassword")}
          name="new_password"
          rules={[
            {
              required: true,
              message: t("passwordRequired"),
            },
            {
              min: 6,
              message: t("passwordMinLength"),
            },
          ]}
        >
          <Input.Password placeholder={t("enterNewPassword")} />
        </Form.Item>
        <Form.Item
          label={t("confirmPassword")}
          name="confirm_password"
          dependencies={["new_password"]}
          rules={[
            { required: true, message: t("passwordRequired") },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("passwordsDoNotMatch")));
              },
            }),
          ]}
        >
          <Input.Password placeholder={t("confirmNewPassword")} />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          block
          loading={mutation.isPending}
        >
          {t("save")}
        </Button>
      </Form>
    </Modal>
  );
};

export default ResetPasswordModal;
