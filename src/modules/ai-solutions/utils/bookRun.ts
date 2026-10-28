import { create } from "zustand";
import type { QueryClient } from "@tanstack/react-query";
import { getAISolutionSubjectQueue, type AILang, type AIQueueItem, type AITreeSubject } from "@/services";
import { errorMessage, processQuestion } from "./runner";

// Bir vaqtda AI ga yuboriladigan savollar soni
const CONCURRENCY = 2;

export type BookRunState = {
  running: boolean;
  total: number;
  done: number;
  failed: number;
  lastError: string;
  active: AIQueueItem[];
};

export const IDLE_RUN: BookRunState = { running: false, total: 0, done: 0, failed: 0, lastError: "", active: [] };

/**
 * Kitoblarni yechish jarayoni komponentdan tashqarida saqlanadi: boshqa sinfga yoki mavzuga o'tilsa ham
 * navbat to'xtamaydi, qaytib kelinganda progress o'sha joyidan ko'rinadi.
 */
const useBookRunStore = create<{ runs: Record<number, BookRunState> }>(() => ({ runs: {} }));

const stopFlags: Record<number, boolean> = {};

const update = (subjectId: number, fn: (run: BookRunState) => BookRunState) =>
  useBookRunStore.setState((state) => ({
    runs: { ...state.runs, [subjectId]: fn(state.runs[subjectId] || IDLE_RUN) },
  }));

export const useBookRun = (subjectId: number) => useBookRunStore((state) => state.runs[subjectId] || IDLE_RUN);

export const stopBookRun = (subjectId: number) => void (stopFlags[subjectId] = true);

/** Savol yechildi — barcha sinflar daraxtidagi (shu tildagi) mavzu sanog'i darhol oshadi */
const markSolved = (queryClient: QueryClient, topicId: number, lang: AILang) =>
  queryClient.setQueriesData<AITreeSubject[]>(
    { predicate: (query) => query.queryKey[0] === "ai-solutions-tree" && query.queryKey[2] === lang },
    (old) =>
      old?.map((subject) => ({
        ...subject,
        chapters: subject.chapters.map((chapter) => ({
          ...chapter,
          topics: chapter.topics.map((topic) =>
            topic.id === topicId
              ? { ...topic, solved_count: Math.min(topic.solved_count + 1, topic.question_count) }
              : topic,
          ),
        })),
      })),
  );

/** Butun kitobni boshidan oxirigacha yechadi (o'zbekcha va ruscha yechimi tayyorlari o'tkazib yuboriladi) */
export const startBookRun = async (
  subjectId: number,
  lang: AILang,
  queryClient: QueryClient,
  failedText: string,
) => {
  if (useBookRunStore.getState().runs[subjectId]?.running) return;
  stopFlags[subjectId] = false;
  const shouldStop = () => Boolean(stopFlags[subjectId]);
  update(subjectId, () => ({ ...IDLE_RUN, running: true }));

  let queue: AIQueueItem[];
  try {
    // Kitob tartibida: bob → mavzu → daraja
    queue = (await getAISolutionSubjectQueue(subjectId)).filter((item) => !item.uz || !item.ru);
  } catch (error) {
    update(subjectId, () => ({ ...IDLE_RUN, lastError: errorMessage(error, failedText) }));
    return;
  }
  update(subjectId, (r) => ({ ...r, total: queue.length }));

  const worker = async () => {
    while (queue.length && !shouldStop()) {
      const item = queue.shift() as AIQueueItem;
      update(subjectId, (r) => ({ ...r, active: [...r.active, item] }));
      let ok = true;
      let message = "";
      try {
        await processQuestion(item.id, lang, { hasUz: item.uz, hasRu: item.ru, hasImages: item.images, shouldStop });
        if (!item.uz) markSolved(queryClient, item.topic_id, "uz");
        if (!item.ru) markSolved(queryClient, item.topic_id, "ru");
      } catch (error) {
        // 3 marta urinib ham bo'lmadi — keyingi savolga o'tiladi, bu savol keyingi ishga tushirishda qayta olinadi
        ok = false;
        message = errorMessage(error, failedText);
      }
      update(subjectId, (r) => ({
        ...r,
        done: r.done + 1,
        failed: r.failed + (ok ? 0 : 1),
        lastError: ok ? r.lastError : message,
        active: r.active.filter((a) => a.id !== item.id),
      }));
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  update(subjectId, (r) => ({ ...r, running: false, active: [] }));
};
