import { useTranslation } from "react-i18next";

const { t } = useTranslation();

export const getRoleOptions = (t: any) => [
  { value: "student", label: t("student") },
  { value: "teacher", label: t("teachers") },
  { value: "parent", label: t("parent") },
  { value: "tutor", label: t("tutor") },
];

export const statusOptions = (t: any) => [
  { value: "active", label: t("statusActive") },
  { value: "inactive", label: t("statusInactive") },
];

export const deviceOptions = (t: any) => [
  { value: "android", label: t("phone") },
  { value: "ios", label: t("ios") },
  { value: "web", label: t("web") },
];

export const classOptions = (t: any) => [
  { value: "5", label: t("class5") },
  { value: "6", label: t("class6") },
  { value: "7", label: t("class7") },
  { value: "8", label: t("class8") },
  { value: "9", label: t("class9") },
  { value: "10", label: t("class10") },
  { value: "11", label: t("class11") },
];

export const subjectOptions = (t: any) => [
  { value: "Algebra", label: t("algebra") },
  { value: "Matematika", label: t("math") },
  { value: "Geometriya", label: t("geometry") },
];
