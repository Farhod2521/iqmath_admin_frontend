import { postTeacherReward } from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import { Form, Modal, Input, Button } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type Props = {
  close: () => void;
  open: boolean;
  selectedStudent: any;
};

const RewardModal = ({ close, open, selectedStudent }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [rewardType, setRewardType] = useState("score");

  const rewardTypes = [
    {
      value: "score",
      label: t("score"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      value: "coin",
      label: t("coins"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"
          />
        </svg>
      ),
    },
    {
      value: "subscription_day",
      label: t("subscriptionDays"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10"
          />
        </svg>
      ),
    },
  ];

  const handleClose = () => {
    close();
    form.resetFields();
    setRewardType("score");
  };

  const handleSelect = (value: string) => {
    setRewardType(value);
    form.setFieldValue("reward_type", value);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload = {
        ...values,
        student_id: selectedStudent?.id,
        reward_type: rewardType,
      };

      postTeacherReward(payload)
        .then((res) => {
          toast.success(t("successful"));
        })
        .catch((err) => handleApiError(err))
        .finally(() => setIsLoading(false));
    });
  };

  return (
    <Modal open={open} onCancel={handleClose} footer={null} centered>
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          {t("giveReward")} - {selectedStudent?.full_name}
        </h2>
      </div>

      <Form form={form} onSubmitCapture={handleSubmit} layout="vertical">
        {/* Reward Type */}
        <Form.Item label={t("rewardType")} name="reward_type">
          <div className="grid grid-cols-3 gap-2">
            {rewardTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => handleSelect(type.value)}
                className={`p-3 cursor-pointer rounded-lg border-2 transition-all ${
                  rewardType === type.value
                    ? "border-[#5D87FF] bg-[#ECF2FF] text-[#5D87FF]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="mb-1 flex justify-center">{type.icon}</div>
                <div className="text-xs font-medium text-center">
                  {type.label}
                </div>
              </button>
            ))}
          </div>
        </Form.Item>

        {/* Amount */}
        <Form.Item
          label={t("amount")}
          name="amount"
          rules={[{ required: true, message: "Miqdor kiriting" }]}
        >
          <Input
            type="number"
            className="rounded-lg"
            placeholder={rewardType === "subscription_day" ? "7" : "10"}
          />
        </Form.Item>

        {/* Reason */}
        <Form.Item
          label={t("reason")}
          name="reason"
          rules={[{ required: true, message: "Sabab kiriting" }]}
        >
          <Input.TextArea
            rows={3}
            className="rounded-lg"
            placeholder={t("enterRewardReason")}
          />
        </Form.Item>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button className="flex-1" onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="flex-1 bg-[#5D87FF]! hover:bg-[#4570EA]!"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {t("adding")}...
              </>
            ) : (
              t("giveReward")
            )}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default RewardModal;
