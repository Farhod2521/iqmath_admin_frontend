import { Button } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiGlobe } from "react-icons/ci";

type LangCode = "uz" | "ru";

type Language = {
  code: LangCode;
  name: string;
};

const languages: Language[] = [
  { code: "uz", name: "UZ" },
  { code: "ru", name: "RU" },
];

const STORAGE_KEY = "lang";

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const currentCode = useMemo<LangCode>(() => {
    // i18n.language ba'zan "uz-UZ" bo'lishi mumkin, shuni kesib olamiz
    const raw = (i18n.language || "uz").slice(0, 2) as LangCode;
    return raw === "ru" ? "ru" : "uz";
  }, [i18n.language]);

  // ✅ initial load: localStorage -> i18n.changeLanguage
  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as LangCode) || "uz";
    const safeStored: LangCode = stored === "ru" ? "ru" : "uz";

    const lang = languages.find((l) => l.code === safeStored) ?? languages[0];

    setSelectedLanguage(lang);

    // agar hozirgi til boshqa bo'lsa, almashtiramiz
    if (currentCode !== lang.code) {
      i18n.changeLanguage(lang.code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // faqat bir marta

  // ✅ outside click to close
  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const handleSelect = async (lang: Language) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, lang.code);
    await i18n.changeLanguage(lang.code);
  };

  if (!selectedLanguage) return null;

  const otherLanguages = languages.filter(
    (l) => l.code !== selectedLanguage.code,
  );

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <CiGlobe
          className="text-[#5d87ff] group-hover:text-blue group-active:text-white transition-colors duration-200"
          size={24}
        />
        <span className="text-sm uppercase">{selectedLanguage.code}</span>
      </Button>

      {isOpen && (
        <div className="absolute left-0 right-0 w-18 mt-1 z-50 bg-white dark:bg-[#5d87ff] border border-gray-300 shadow-md rounded-md">
          {otherLanguages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang)}
              className="w-full py-1 uppercase text-black bg-white hover:bg-[#5d87ff] hover:text-white rounded-md text-center"
              role="menuitem"
            >
              {lang.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
