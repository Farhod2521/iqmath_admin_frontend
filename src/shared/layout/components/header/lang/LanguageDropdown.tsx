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

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  //Tilni to‘g‘ridan-to‘g‘ri i18n dan olamiz
  const currentCode = useMemo<LangCode>(() => {
    const raw = (i18n.language || "uz").slice(0, 2) as LangCode;
    return raw === "ru" ? "ru" : "uz";
  }, [i18n.language]);

  const selectedLanguage =
    languages.find((l) => l.code === currentCode) ?? languages[0];

  // outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const handleSelect = (lang: Language) => {
    setIsOpen(false);
    i18n.changeLanguage(lang.code); // await ham shart emas
  };

  const otherLanguages = languages.filter(
    (l) => l.code !== selectedLanguage.code,
  );

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <Button onClick={() => setIsOpen((prev) => !prev)}>
        <CiGlobe size={20} />
        <span className="ml-2 text-sm uppercase">{selectedLanguage.code}</span>
      </Button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 z-50 bg-white border border-gray-300 shadow-md rounded-md">
          {otherLanguages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang)}
              className="w-full py-1 uppercase text-black hover:bg-[#5d87ff] hover:text-white rounded-md text-center"
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
