import { Card, Form, InputNumber, Button, Row, Col } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getManagementReferalCoupons,
  postManagementReferalCoupons,
  putManagementReferalCoupons,
} from "@/services";
import { useEffect } from "react";
import { handleApiError } from "@/shared/utils/handleApiError";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ReferralCouponSettings = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  // GET
  const { data, isLoading, error } = useQuery({
    queryKey: ["referral-settings"],
    queryFn: getManagementReferalCoupons,
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // fill form
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  // CREATE
  const createMutation = useMutation({
    mutationFn: postManagementReferalCoupons,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["referral-settings"] });
    },
    onError: (err) => handleApiError(err),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: putManagementReferalCoupons,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["referral-settings"] });
    },
    onError: (err) => handleApiError(err),
  });

  // SUBMIT
  const handleSubmit = async () => {
    const values = await form.validateFields();

    if (data) {
      await updateMutation.mutateAsync(values);
    } else {
      await createMutation.mutateAsync(values);
    }
  };

  return (
    <Card
      title={t("referralSettings.title")}
      loading={isLoading}
      extra={
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={createMutation.isPending || updateMutation.isPending}
        >
          {t("referralSettings.save")}
        </Button>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="teacher_referral_bonus_points"
              label={t("referralSettings.teacherBonus")}
              rules={[
                {
                  required: true,
                  message: t("referralSettings.required"),
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="student_referral_bonus_points"
              label={t("referralSettings.studentBonus")}
              rules={[
                {
                  required: true,
                  message: t("referralSettings.required"),
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="coupon_discount_percent"
              label={t("referralSettings.couponDiscount")}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="coupon_discount_percent_teacher"
              label={t("referralSettings.couponDiscountTeacher")}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="coupon_valid_days"
              label={t("referralSettings.couponDays")}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="referral_valid_days"
              label={t("referralSettings.referralDays")}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="coupon_student_cashback_percent"
              label={t("referralSettings.studentCashback")}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="coupon_teacher_cashback_percent"
              label={t("referralSettings.teacherCashback")}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ReferralCouponSettings;