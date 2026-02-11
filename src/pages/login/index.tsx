import { Form, Input, Button, Card, Checkbox, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuthCSRF, postAuthCallbackLogIn } from "@/http";
import { toast } from "react-toastify";
import { nextAuthLikeLogin } from "./components/nextAuthLikeLogin";
const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const resCsrf = await getAuthCSRF();
      const csrfToken = resCsrf?.csrfToken;

      const formattedPhone = `998${values.phone.replace(/[^0-9]/g, "")}`;

      const res = await nextAuthLikeLogin({
        phone: formattedPhone,
        password: values.password,
        csrfToken: csrfToken,
      });

      // NextAuth odatda cookie/session o'rnatadi.
      // Siz token ishlatayotgan bo'lsangiz — backend token qaytarishi kerak.
      // Hozircha demo:
      localStorage.setItem("token", "demo-token");

      // response’dan callbackUrl qaytsa:
      // masalan res.url bo'lsa:
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Login xatosi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0b1020]">
      {/* Background glow blobs */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_45%)]" />

      {/* Card */}
      <Card
        className="w-[440px] max-w-[92vw] rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        bodyStyle={{ padding: 28 }}
      >
        {/* Header */}
        <div className="mb-7 text-center">
          <Title level={3} style={{ margin: 0, color: "white" }}>
            Tizimga kirish
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.75)" }}>
            Login va parolingizni kiriting
          </Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          {/* PHONE */}
          <Form.Item
            label={<span className="text-white/80">Telefon</span>}
            name="phone"
            rules={[{ required: true, message: "Telefon raqamni kiriting" }]}
          >
            <Input
              size="large"
              placeholder="(77) 127-48-44"
              rootClassName="loginInput"
              prefix={<span className="loginPrefix">+998</span>}
              className="h-[46px] rounded-xl"
            />
          </Form.Item>

          {/* PASSWORD */}
          <Form.Item
            label={<span className="text-white/80">Parol</span>}
            name="password"
            rules={[{ required: true, message: "Parolni kiriting" }]}
          >
            <Input.Password
              size="large"
              placeholder="••••••••"
              rootClassName="loginInput"
              prefix={<LockOutlined className="text-white/80" />}
              className="h-[46px] rounded-xl"
            />
          </Form.Item>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between mb-5">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-white/90">Eslab qolsin</Checkbox>
            </Form.Item>

            <button
              type="button"
              className="text-white/80 hover:text-white transition text-sm underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
              onClick={() => console.log("Forgot password")}
            >
              Parolni unutdingizmi?
            </button>
          </div>

          {/* BUTTON */}
          <Button
            htmlType="submit"
            loading={loading}
            className="w-full h-[46px] rounded-xl border-0 text-white font-semibold
                       bg-gradient-to-r from-[#5D87FF] to-[#7C5CFF]
                       hover:from-[#4B79FF] hover:to-[#6B4DFF]
                       shadow-[0_10px_25px_rgba(93,135,255,0.35)]"
          >
            Kirish
          </Button>

          {/* Small footer */}
          <div className="mt-5 text-center text-xs text-white/50">
            Kirish orqali siz tizim shartlariga rozilik bildirasiz
          </div>
        </Form>

        <style>{`
          .loginInput.ant-input-affix-wrapper {
            background: rgba(255,255,255,0.16) !important;
            border: 1px solid rgba(255,255,255,0.18) !important;
            box-shadow: none !important;
            color: white !important;
            transition: all .2s ease;
          }
          .loginInput.ant-input-affix-wrapper:hover {
            background: rgba(255,255,255,0.20) !important;
            border-color: rgba(255,255,255,0.28) !important;
          }
          .loginInput.ant-input-affix-wrapper-focused {
            background: rgba(255,255,255,0.22) !important;
            border-color: rgba(93,135,255,0.75) !important;
            box-shadow: 0 0 0 4px rgba(93,135,255,0.18) !important;
          }
          .loginInput input {
            background: transparent !important;
            color: white !important;
          }
          .loginInput input::placeholder {
            color: rgba(255,255,255,0.55) !important;
          }
          .loginPrefix {
            color: rgba(255,255,255,0.85);
            padding-right: 10px;
            margin-right: 10px;
            border-right: 1px solid rgba(255,255,255,0.22);
            line-height: 1;
          }
          .loginInput.ant-input-affix-wrapper:hover .loginPrefix,
          .loginInput.ant-input-affix-wrapper-focused .loginPrefix {
            color: rgba(255,255,255,0.92);
            border-right-color: rgba(255,255,255,0.32);
          }
          /* eye icon color */
          .loginInput .ant-input-password-icon {
            color: rgba(255,255,255,0.70) !important;
          }
          .loginInput .ant-input-password-icon:hover {
            color: rgba(255,255,255,0.92) !important;
          }
          /* checkbox */
          .ant-checkbox-inner {
            border-color: rgba(255,255,255,0.35) !important;
            background: rgba(255,255,255,0.10) !important;
          }
        `}</style>
      </Card>
    </div>
  );
}
