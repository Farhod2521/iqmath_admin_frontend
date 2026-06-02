import { useTranslation } from "react-i18next";

type TFunc = (key: string) => string;

export const useOptions = () => {
  const { t } = useTranslation();

  const roleOptions = [
    { value: "student", label: t("student") },
    { value: "teacher", label: t("teachers") },
    { value: "parent", label: t("parent") },
    { value: "tutor", label: t("tutor") },
  ];

  const statusOptions = [
    { value: "active", label: t("statusActive") },
    { value: "inactive", label: t("statusInactive") },
  ];

  const deviceOptions = [
    { value: "android", label: t("phone") },
    { value: "ios", label: t("ios") },
    { value: "web", label: t("web") },
  ];

  const langOptions = [
    { value: "uz", label: "UZ" },
    { value: "ru", label: "RU" },
  ];

  const classOptions = [
    { value: "5", label: t("class5") },
    { value: "6", label: t("class6") },
    { value: "7", label: t("class7") },
    { value: "8", label: t("class8") },
    { value: "9", label: t("class9") },
    { value: "10", label: t("class10") },
    { value: "11", label: t("class11") },
  ];

  const subjectOptions = [
    { value: "Algebra", label: t("algebra") },
    { value: "Matematika", label: t("math") },
    { value: "Geometriya", label: t("geometry") },
  ];

  const fineTypeOptions = [
    { value: "score", label: t("score") },
    { value: "coin", label: t("coin") },
    // { value: "absence", label: t("absence") },
    // { value: "homework", label: t("homework") },
  ];

  const yesNoOptions = [
    { value: true, label: t("yes") },
    { value: false, label: t("no") },
  ];

  const genderOptions = [
    { value: "male", label: t("male") },
    { value: "female", label: t("female") },
  ];

  const deviceFilterOptions = [
    { value: "android", label: "Android" },
    { value: "ios", label: "iOS" },
    { value: "web", label: "Web" },
  ];

  const paginationSizeOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  return {
    roleOptions,
    statusOptions,
    deviceOptions,
    langOptions,
    classOptions,
    subjectOptions,
    fineTypeOptions,
    yesNoOptions,
    genderOptions,
    deviceFilterOptions,
    paginationSizeOptions,
  };
};
