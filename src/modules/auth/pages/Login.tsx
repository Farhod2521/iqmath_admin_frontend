import React, { useState } from "react";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import {
  LockOutlined,
  PhoneOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAuthUserMe, postAuthLogin } from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import Brand from "@/shared/components/brand";
import { saveAuthData } from "@/configs/auth";
import {
  selectedSetAuth,
  selectedSetUserData,
  useStoreAuth,
  useStoreUsers,
} from "@/store";

const { Title, Text } = Typography;

type LoginValues = {
  phone: string;
  password: string;
  remember?: boolean;
};

export default function IQmathLogin() {
  const navigate = useNavigate();
  const setAuth = useStoreAuth(selectedSetAuth);
  const [loading, setLoading] = useState(false);
  const setUserData = useStoreUsers(selectedSetUserData);

  const getMe = () => {
    getAuthUserMe().then((res) => {
      setUserData(res);
    });
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const formattedPhone = Number(
        `998${values.phone.replace(/[^0-9]/g, "")}`,
      );

      const res = await postAuthLogin({
        phone: formattedPhone,
        password: values.password,
        redirect: false,
        remember: values.remember,
      });

      setTimeout(() => {
        saveAuthData(res);
        setAuth(res);
        getMe();
        navigate("/dashboard");
      }, 1000);
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 flex-col justify-between overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-2xl" />

        {/* Mathematical symbols decoration */}
        <div className="absolute top-1/4 right-1/4 text-white/10 text-6xl font-bold">
          π
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-white/10 text-7xl font-bold">
          ∑
        </div>
        <div className="absolute top-2/3 right-1/3 text-white/10 text-5xl font-bold">
          ∞
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Brand color />
        </div>

        <div className="relative z-10">
          <h2 className="text-white text-4xl font-bold mb-6 leading-tight">
            Matematikani samarali
            <br />
            o'rganish platformasiga
            <br />
            xush kelibsiz!
          </h2>
          <p className="text-white/90 text-lg mb-4">
            Algebra, geometriya, statistika va hisob bo'yicha video darsliklar,
            amaliy topshiriqlar va testlar orqali bilimingizni oshiring
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white text-sm font-medium">
                Video darsliklar
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white text-sm font-medium">
                Amaliy mashqlar
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white text-sm font-medium">
                Moslashuvchan ta'lim
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-4 text-white/70 text-sm">
          <a href="#" className="hover:text-white transition">
            Yordam markazi
          </a>
          <span>•</span>
          <a href="#" className="hover:text-white transition">
            Maxfiylik siyosati
          </a>
          <span>•</span>
          <a href="#" className="hover:text-white transition">
            Foydalanish shartlari
          </a>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-linear-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}

          <div className="lg:hidden flex items-center gap-3 mb-12">
            <Brand />
          </div>
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Tizimga kirish
            </h2>
            <p className="text-gray-600">
              Matematikani o'rganishni davom ettirish uchun hisobingizga kiring
            </p>
          </div>

          {/* Form */}
          <Form<LoginValues>
            layout="vertical"
            requiredMark={false}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            {/* Phone Input */}
            <Form.Item
              label={
                <span className="text-gray-700 font-medium text-sm">
                  Telefon raqam
                </span>
              }
              name="phone"
              rules={[
                { required: true, message: "Telefon raqamni kiriting" },
                {
                  validator: (_, value) => {
                    const digits = String(value || "").replace(/\D/g, "");
                    if (!digits) return Promise.resolve();
                    return digits.length === 9
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Telefon 9 ta raqamdan iborat bo'lsin"),
                        );
                  },
                },
              ]}
            >
              <Input
                size="large"
                placeholder="77 127 48 44"
                prefix={
                  <div className="flex items-center gap-2 pr-2 border-r border-gray-200">
                    <PhoneOutlined className="text-gray-400" />
                    <span className="text-gray-600 font-medium">+998</span>
                  </div>
                }
                className="modern-input"
              />
            </Form.Item>

            {/* Password Input */}
            <Form.Item
              label={
                <span className="text-gray-700 font-medium text-sm">Parol</span>
              }
              name="password"
              rules={[{ required: true, message: "Parolni kiriting" }]}
            >
              <Input.Password
                size="large"
                placeholder="Parolingizni kiriting"
                prefix={<LockOutlined className="text-gray-400" />}
                className="modern-input"
              />
            </Form.Item>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between mb-8">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="modern-checkbox">
                  <span className="text-gray-600 text-sm">Eslab qolish</span>
                </Checkbox>
              </Form.Item>

              <button
                type="button"
                onClick={() => console.log("Forgot password")}
                className="text-blue-600 hover:text-blue-700 transition text-sm font-medium"
              >
                Parolni unutdingizmi?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              htmlType="submit"
              loading={loading}
              size="large"
              className="iqmath-submit-btn"
              icon={!loading && <ArrowRightOutlined />}
            >
              Kirish
            </Button>
          </Form>
        </div>

        <style>{`
          .modern-input.ant-input-affix-wrapper {
            border: 1.5px solid #e5e7eb;
            border-radius: 12px;
            padding: 12px 16px;
            background: #ffffff;
            transition: all 0.2s ease;
            height: 48px;
          }

          .modern-input.ant-input-affix-wrapper:hover {
            border-color: #bfdbfe;
            background: #fafbff;
          }

          .modern-input.ant-input-affix-wrapper-focused {
            border-color: #3b82f6;
            background: #ffffff;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          }

          .modern-input input {
            background: transparent !important;
            color: #111827;
            font-size: 15px;
          }

          .modern-input input::placeholder {
            color: #9ca3af;
          }

          .iqmath-submit-btn {
            width: 100%;
            height: 48px;
            border-radius: 12px;
            border: none;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            font-weight: 600;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
          }

          .iqmath-submit-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
            transform: translateY(-2px);
          }

          .iqmath-submit-btn:active:not(:disabled) {
            transform: translateY(0);
          }

          .modern-checkbox .ant-checkbox-inner {
            border: 1.5px solid #d1d5db;
            border-radius: 6px;
            width: 18px;
            height: 18px;
            background: white;
          }

          .modern-checkbox .ant-checkbox-checked .ant-checkbox-inner {
            background: #3b82f6;
            border-color: #3b82f6;
          }

          .modern-checkbox:hover .ant-checkbox-inner {
            border-color: #3b82f6;
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }

          .animate-pulse {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          .delay-1000 {
            animation-delay: 1s;
          }
        `}</style>
      </div>
    </div>
  );
}
