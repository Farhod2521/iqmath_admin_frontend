import { axiosApi } from "@/configs/api";

export type AILang = "uz" | "ru";

export type AISolutionStep = { title: string; text: string; math: string[] };

export type AIGraphFigure = {
  type: "graph";
  x: [number, number];
  y: [number, number];
  functions: { expr: string; label: string }[];
  points: { x: number; y: number; label: string }[];
};

export type AISvgFigure = { type: "svg"; svg: string };

export type AIFigure = AIGraphFigure | AISvgFigure;

export type AISolutionPart = {
  label: string;
  given: string[];
  find: string;
  short: { formula: string; steps: string[]; answer: string };
  detailed: { figure?: AIFigure | null; steps: AISolutionStep[]; answer: string };
};

export type AISolutionData = {
  parts: AISolutionPart[];
  answer: string;
  conclusion: string;
};

export type AIQuestion = {
  id: number;
  level: number;
  type: "text" | "choice" | "image_choice" | "composite";
  /** Matnda hali formulaga aylantirilmagan base64 rasm bor */
  has_images: boolean;
  text: string;
  text_answer: string;
  choices: { letter: string; text: string; image_url: string | null; is_correct: boolean }[];
  sub_questions: { text1: string; answer: string; text2: string }[];
  solution: { data: AISolutionData; ai_model: string; updated_at: string } | null;
};

export type AITopicDetail = {
  id: number;
  name: string;
  chapter: string;
  subject: string;
  class_name: string;
  questions: AIQuestion[];
};

export type AITreeTopic = { id: number; name: string; question_count: number; solved_count: number };
export type AITreeSubject = {
  id: number;
  name: string;
  active: boolean;
  chapters: { id: number; name: string; topics: AITreeTopic[] }[];
};

export type AIConfig = { configured: boolean; model: string; format: string };

export const getAISolutionConfig = () => axiosApi.get<AIConfig>("/management/ai-solutions/config/");

export const getAISolutionClasses = () =>
  axiosApi.get<{ id: number; name: string }[]>("/management/ai-solutions/classes/");

export const getAISolutionTree = (class_id: number, lang: AILang) =>
  axiosApi.get<AITreeSubject[]>("/management/ai-solutions/tree/", { class_id, lang });

export const getAISolutionTopic = (id: number | string, lang: AILang) =>
  axiosApi.get<AITopicDetail>(`/management/ai-solutions/topics/${id}/`, { lang });

export type AIQueueItem = {
  id: number;
  topic_id: number;
  chapter_id: number;
  uz: boolean;
  ru: boolean;
  /** Matnida base64 rasm bor — yechishdan oldin formulaga aylantiriladi */
  images: boolean;
};

export const getAISolutionSubjectQueue = (subjectId: number) =>
  axiosApi.get<AIQueueItem[]>(`/management/ai-solutions/subjects/${subjectId}/queue/`);

/** Savolni o'zbekcha yechadi; javob — `lang` tilidagi ko'rinish */
export const solveQuestionWithAI = (id: number, lang: AILang, force = false) =>
  axiosApi.post<AIQuestion>(`/management/ai-solutions/questions/${id}/solve/`, { lang, force });

/** Matndagi base64 rasm-formulalarni AI bilan LaTeX ga aylantirib bazaga yozadi */
export const digitizeQuestionWithAI = (id: number, lang: AILang) =>
  axiosApi.post<AIQuestion>(`/management/ai-solutions/questions/${id}/digitize/`, { lang });

/** O'zbekcha yechimni rus tiliga o'giradi */
export const translateQuestionWithAI = (id: number, lang: AILang, force = false) =>
  axiosApi.post<AIQuestion>(`/management/ai-solutions/questions/${id}/translate/`, { lang, force });
