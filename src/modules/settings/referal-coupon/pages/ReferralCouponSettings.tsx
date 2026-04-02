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

const ReferralCouponSettings = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  //  GET
  const { data, isLoading, error } = useQuery({
    queryKey: ["referral-settings"],
    queryFn: async () => {
      const res = await getManagementReferalCoupons();
      return res;
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  //  fill form
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  //  CREATE
  const createMutation = useMutation({
    mutationFn: postManagementReferalCoupons,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["referral-settings"] });
    },
    onError: (e) => handleApiError(e),
  });

  //  UPDATE
  const updateMutation = useMutation({
    mutationFn: putManagementReferalCoupons,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["referral-settings"] });
    },
    onError: (e) => handleApiError(e),
  });

  //  SUBMIT
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
      title="Referal va kupon sozlamalari"
      loading={isLoading}
      extra={
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={createMutation.isPending || updateMutation.isPending}
        >
          Saqlash
        </Button>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="teacher_referral_bonus_points"
              label="O‘qituvchi uchun referal bonus (ball)"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="student_referral_bonus_points"
              label="O‘quvchi uchun referal bonus (ball)"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="coupon_discount_percent"
              label="Kupon chegirmasi (%)"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="coupon_discount_percent_teacher"
              label="Mentor uchun kupon chegirmasi (%)"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="coupon_valid_days"
              label="Kupon amal qilish muddati (kun)"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="referral_valid_days"
              label="Referal kod amal qilish muddati (kun)"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="coupon_student_cashback_percent"
              label="O‘quvchi uchun cashback (%)"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="coupon_teacher_cashback_percent"
              label="O‘qituvchi uchun cashback (%)"
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
