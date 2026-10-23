import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { FaPlay, FaCheck, FaChartSimple } from "react-icons/fa6";
import { FiChevronDown, FiGlobe, FiLock, FiShield, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getAuthUserMe, postAuthLogin } from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import Brand from "@/shared/components/brand";
import { saveAuthData, removeAuthData } from "@/configs/auth";
import {
  selectedSetAuth,
  selectedSetUserData,
  useStoreAuth,
  useStoreUsers,
} from "@/store";
import { ROLES } from "@/configs/constants";
import { useTranslation } from "react-i18next";

type LoginValues = {
  phone: string;
  password: string;
};

const FEATURES = [
  {
    title: "Video darsliklar",
    sub: "Interaktiv darslar",
    Icon: FaPlay,
    gradient: "from-[#3B82F6] to-[#2563EB]",
  },
  {
    title: "Amaliy mashqlar",
    sub: "Mustahkam bilim",
    Icon: FaCheck,
    gradient: "from-[#A855F7] to-[#7C3AED]",
  },
  {
    title: "Moslashuvchan ta'lim",
    sub: "O'zingizga mos rejim",
    Icon: FaChartSimple,
    gradient: "from-[#6366F1] to-[#4338CA]",
  },
];

const LOGIN_BG = "/images/admin/login-bg.webp";

const LANGUAGES = [
  { code: "uz", name: "O'zbekcha" },
  { code: "ru", name: "Русский" },
];

/** O'zbekiston bayrog'i (telefon maydoni uchun) */
const UzFlag = () => (
  <svg viewBox="0 0 30 20" className="h-[14px] w-[21px] shrink-0 overflow-hidden rounded-[3px]">
    <rect width="30" height="20" fill="#1EB53A" />
    <rect width="30" height="13.2" fill="#fff" />
    <rect width="30" height="6.4" fill="#0099B5" />
    <rect y="6.4" width="30" height="0.6" fill="#CE1126" />
    <rect y="12.6" width="30" height="0.6" fill="#CE1126" />
    <circle cx="4.6" cy="3.2" r="2.1" fill="#fff" />
    <circle cx="5.4" cy="3.2" r="1.8" fill="#0099B5" />
  </svg>
);

/** Osmondagi oq chiziqli matematik chizmalar */
const MathDoodles = () => (
  <svg
    viewBox="0 0 330 330"
    fill="none"
    stroke="white"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="pointer-events-none absolute right-[4%] top-[12%] w-[24%] max-w-[300px] opacity-90 drop-shadow-[0_2px_6px_rgba(30,64,175,0.25)]"
  >
    <text
      x="40"
      y="62"
      fill="white"
      stroke="none"
      fontSize="34"
      fontStyle="italic"
      fontFamily="'Segoe Script','Comic Sans MS',cursive"
    >
      a² + b² = c²
    </text>
    {/* Kub */}
    <path d="M24 128 L68 112 L100 126 L56 142 Z M24 128 V176 L56 190 V142 M56 190 L100 174 V126" />
    <path d="M24 176 L68 160 L100 174 M68 112 V160" strokeDasharray="4 5" opacity="0.7" />
    {/* Grafik */}
    <path d="M168 196 H262 M180 206 V100 M174 108 L180 98 L186 108 M254 190 L264 196 L254 202" />
    <path d="M184 190 C210 186 226 164 232 132 C236 112 242 104 250 100" />
    {/* Uchburchak */}
    <path d="M78 300 L118 236 L160 300 Z M118 236 V300" />
    <text x="112" y="228" fill="white" stroke="none" fontSize="13" fontStyle="italic">C</text>
    <text x="62" y="306" fill="white" stroke="none" fontSize="13" fontStyle="italic">A</text>
    <text x="164" y="306" fill="white" stroke="none" fontSize="13" fontStyle="italic">B</text>
  </svg>
);

const LanguagePill = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const current = LANGUAGES.find((l) => i18n.language?.startsWith(l.code)) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-2.5 rounded-2xl border border-white bg-white/90 px-4 py-2.5 text-[14px] font-semibold text-[#0F172A] shadow-[0_10px_30px_-18px_rgba(30,41,99,0.45)] backdrop-blur transition hover:bg-white"
      >
        <FiGlobe size={17} />
        {current.name}
        <FiChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#EEF0F6] bg-white py-1 shadow-[0_18px_40px_-20px_rgba(30,41,99,0.4)]">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              className={`block w-full cursor-pointer px-4 py-2 text-left text-[14px] transition hover:bg-[#F1F5FF] ${
                lang.code === current.code ? "font-bold text-[#2563EB]" : "text-[#334155]"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function IQmathLogin() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const setAuth = useStoreAuth(selectedSetAuth);
  const [loading, setLoading] = useState(false);
  const setUserData = useStoreUsers(selectedSetUserData);

  const getMe = async () => {
    const res = await getAuthUserMe();
    setUserData(res);
    return res;
  };

  const onFinish = async (values: LoginValues) => {
    setLoading(true);

    try {
      const formattedPhone = Number(
        `998${values.phone.replace(/[^0-9]/g, "")}`,
      );

      const res = await postAuthLogin({
        phone: formattedPhone,
        password: values.password,
        device: "web",
        lang: i18n.language,
      });

      setTimeout(async () => {
        saveAuthData(res?.data);
        setAuth(res?.data);
        const userData = await getMe();
        if (userData?.role !== ROLES.SUPERADMIN) {
          // Remove auth data and redirect or show error
          removeAuthData();
          setAuth(null);
          setUserData(null);
          handleApiError({ message: "Faqat superadmin kirishi mumkin" });
          return;
        }
        navigate("/statistics");
      }, 1000);
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="iq-login flex min-h-screen font-['Manrope',sans-serif]">
      {/* Chap tomon: manzara va platforma haqida */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#E3EEFE] px-[7%] pb-8 pt-12 lg:flex lg:w-[58%]">
        {/* Yuqori qism — shu rasmning xiralashtirilgan osmoni; pastda rasm to'liq kenglikda */}
        <div
          className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-[left_top] blur-2xl"
          style={{ backgroundImage: `url(${LOGIN_BG})` }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 aspect-[1672/941] bg-[length:100%_auto] bg-bottom bg-no-repeat"
          style={{
            backgroundImage: `url(${LOGIN_BG})`,
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 24%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 24%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0.4)_40%,rgba(255,255,255,0)_62%)]" />
        <MathDoodles />

        <div className="relative z-10">
          <Brand />
        </div>

        <div className="relative z-10 -mt-[14vh]">
          <h1 className="max-w-[600px] text-[clamp(32px,3.1vw,48px)] font-extrabold leading-[1.15] tracking-tight text-[#0F172A]">
            Matematikani samarali o'rganish platformasiga{" "}
            <span className="text-[#1D6BFF]">xush kelibsiz!</span>
          </h1>
          <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-[#334155]">
            Algebra, geometriya, statistika va hisob bo'yicha video darsliklar,
            amaliy topshiriqlar va testlar orqali bilimingizni oshiring.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {FEATURES.map(({ title, sub, Icon, gradient }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/65 py-2.5 pl-2.5 pr-5 shadow-[0_14px_30px_-22px_rgba(30,41,99,0.5)] backdrop-blur-md"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${gradient} text-white shadow-[0_8px_16px_-8px_rgba(37,99,235,0.8)]`}
                >
                  <Icon size={15} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[14.5px] font-bold text-[#0F172A]">{title}</span>
                  <span className="text-[12.5px] text-[#475569]">{sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-[13px] font-medium text-[#0F172A]/80 [text-shadow:0_1px_6px_rgba(255,255,255,0.8)]">
          <span>Yordam markazi</span>
          <span>•</span>
          <span>Maxfiylik siyosati</span>
          <span>•</span>
          <span>Foydalanish shartlari</span>
        </div>
      </div>

      {/* O'ng tomon: kirish formasi */}
      <div className="relative flex w-full flex-col overflow-hidden bg-[#F5F7FD] px-5 py-6 sm:px-10 lg:w-[42%]">
        <span className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-[#E6EBFF] blur-3xl" />
        <span className="pointer-events-none absolute -bottom-32 -left-20 h-[420px] w-[420px] rounded-full bg-[#EDE9FF] blur-3xl" />

        <div className="relative z-10 flex items-center justify-between lg:justify-end">
          <div className="lg:hidden">
            <Brand />
          </div>
          <LanguagePill />
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center py-10">
          <div className="relative w-full max-w-[470px]">
            {/* Suzib turuvchi 3D bezaklar */}
            <img src="/images/admin/login-cap.webp" alt="" className="iq-float pointer-events-none absolute -left-16 -top-12 hidden w-[92px] xl:block" />
            <img src="/images/admin/login-gem.webp" alt="" className="iq-float-slow pointer-events-none absolute -right-20 top-2 hidden w-[78px] xl:block" />
            <img src="/images/admin/login-book.webp" alt="" className="iq-float-slow pointer-events-none absolute -bottom-6 -left-24 hidden w-[86px] xl:block" />
            <img src="/images/admin/login-calc.webp" alt="" className="iq-float pointer-events-none absolute -bottom-10 -right-20 hidden w-[96px] xl:block" />

            <div className="relative rounded-[28px] border border-white bg-white/85 px-6 py-9 shadow-[0_40px_80px_-40px_rgba(30,41,99,0.35)] backdrop-blur-xl sm:px-11 sm:py-12">
              <h2 className="text-[30px] font-extrabold tracking-tight text-[#0F172A] sm:text-[34px]">
                Tizimga kirish
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#475569]">
                Matematikani o'rganishni davom ettirish uchun hisobingizga kiring
              </p>

              <div className="mt-8">
              <Form<LoginValues>
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
              >
                <Form.Item
                  label={
                    <span className="flex items-center gap-2 text-[14px] font-bold text-[#0F172A]">
                      <FiUser size={16} /> Telefon raqam
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
                    inputMode="numeric"
                    placeholder="90 123 45 67"
                    prefix={
                      <span className="mr-2 flex items-center gap-2.5 border-r border-[#E2E8F0] pr-3">
                        <UzFlag />
                        <span className="font-semibold text-[#0F172A]">+998</span>
                      </span>
                    }
                    className="iq-input"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="flex items-center gap-2 text-[14px] font-bold text-[#0F172A]">
                      <FiLock size={16} /> Parol
                    </span>
                  }
                  name="password"
                  rules={[{ required: true, message: "Parolni kiriting" }]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Parolingizni kiriting"
                    prefix={<FiLock size={17} className="mr-1.5 text-[#475569]" />}
                    className="iq-input"
                  />
                </Form.Item>

                <Button
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  className="iq-submit"
                  icon={!loading && <ArrowRightOutlined />}
                >
                  Kirish
                </Button>
              </Form>
              </div>

              <div className="mt-7 flex items-center gap-3 text-[13px] text-[#64748B]">
                <span className="h-px flex-1 bg-[#E5E9F2]" />
                <span className="flex items-center gap-1.5">
                  <FiShield size={14} /> Faqat administratorlar uchun
                </span>
                <span className="h-px flex-1 bg-[#E5E9F2]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .iq-login .iq-input.ant-input-affix-wrapper {
          height: 56px;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          padding: 0 16px;
          background: #fff;
          transition: all 0.2s ease;
        }
        .iq-login .iq-input.ant-input-affix-wrapper:hover { border-color: #BFD3FE; }
        .iq-login .iq-input.ant-input-affix-wrapper-focused {
          border-color: #3B82F6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
        }
        .iq-login .iq-input input {
          font-family: inherit;
          font-size: 16px;
          color: #0F172A;
          background: transparent !important;
        }
        .iq-login .iq-input input::placeholder { color: #94A3B8; }
        .iq-login .ant-form-item-label { padding-bottom: 8px; }
        .iq-login .ant-form-item { margin-bottom: 22px; }
        .iq-login .iq-submit {
          margin-top: 10px;
          width: 100%;
          height: 56px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(90deg, #1D6BFF 0%, #4F46E5 60%, #9333EA 100%);
          color: #fff;
          font-family: inherit;
          font-size: 17px;
          font-weight: 700;
          box-shadow: 0 16px 30px -14px rgba(79, 70, 229, 0.75);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .iq-login .iq-submit:hover:not(:disabled) {
          color: #fff !important;
          background: linear-gradient(90deg, #1758D6 0%, #4338CA 60%, #7E22CE 100%) !important;
          transform: translateY(-1px);
          box-shadow: 0 20px 34px -14px rgba(79, 70, 229, 0.85);
        }
        @keyframes iq-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        .iq-login .iq-float { animation: iq-float 5s ease-in-out infinite; }
        .iq-login .iq-float-slow { animation: iq-float 7s ease-in-out infinite 0.8s; }
        @media (prefers-reduced-motion: reduce) {
          .iq-login .iq-float, .iq-login .iq-float-slow { animation: none; }
        }
      `}</style>
    </div>
  );
}
