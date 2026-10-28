import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Alert, Button, Card, Empty, Popconfirm, Progress, Segmented, Skeleton, Tag } from "antd";
import { LuArrowLeft, LuCircleStop, LuRefreshCw, LuSparkles } from "react-icons/lu";
import {
  getAISolutionConfig,
  getAISolutionTopic,
  type AILang,
  type AIQuestion,
  type AITopicDetail,
} from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import HandwrittenSolution, { type SolutionMode } from "../components/HandwrittenSolution";
import { errorMessage, processQuestion } from "../utils/runner";

// Formulalar savol matnida \( \) va $$ ichida keladi
const MATHJAX_CONFIG = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: {
    inlineMath: [
      ["\\(", "\\)"],
      ["$", "$"],
    ],
    displayMath: [
      ["\\[", "\\]"],
      ["$$", "$$"],
    ],
  },
  // Daftardagidek: formulalar markazda emas, chap tomondan yoziladi
  chtml: { displayAlign: "left", displayIndent: "0" },
};

// Daftardagi sarlavhalar yechim tilida yoziladi (interfeys tilidan qat'i nazar)
const SHEET_LABELS = {
  uz: { given: "Berilgan:", find: "Topish:", formula: "Formula:", calc: "Hisoblash:", solution: "Yechish:", answer: "Javob:" },
  ru: { given: "Дано:", find: "Найти:", formula: "Формула:", calc: "Вычисление:", solution: "Решение:", answer: "Ответ:" },
};

// Bir vaqtda AI ga yuboriladigan savollar soni
const CONCURRENCY = 2;

type RunState = { running: boolean; total: number; done: number; failed: number; current: number[] };

const QuestionCard = ({
  question,
  index,
  lang,
  mode,
  busy,
  error,
  onSolve,
}: {
  question: AIQuestion;
  index: number;
  lang: AILang;
  mode: SolutionMode;
  busy: boolean;
  error?: string;
  onSolve: (force: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [localMode, setLocalMode] = useState<SolutionMode>(mode);
  useEffect(() => setLocalMode(mode), [mode]);

  return (
    <Card className="!rounded-2xl" styles={{ body: { padding: 20 } }}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-[#EEF3FF] px-2.5 py-1 text-[13px] font-semibold text-[#3B5BDB]">
            {index + 1}-{t("aiSolutions.question")}
          </span>
          <Tag className="!m-0">
            {question.level}-{t("aiSolutions.level")}
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          {question.solution ? (
            <Segmented
              size="small"
              value={localMode}
              onChange={(value) => setLocalMode(value as SolutionMode)}
              options={[
                { value: "short", label: t("aiSolutions.short") },
                { value: "detailed", label: t("aiSolutions.detailed") },
              ]}
            />
          ) : null}
          <Button
            size="small"
            loading={busy}
            icon={question.solution ? <LuRefreshCw /> : <LuSparkles />}
            onClick={() => onSolve(Boolean(question.solution))}
          >
            {question.solution ? t("aiSolutions.resolveOne") : t("aiSolutions.solveOne")}
          </Button>
        </div>
      </div>

      {/* Savol matni */}
      <MathJax dynamic>
        <div className="question-html text-[15px] leading-relaxed text-[#0F172A]" dangerouslySetInnerHTML={{ __html: question.text }} />
      </MathJax>

      {question.choices.length ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {question.choices.map((choice) => (
            <div
              key={choice.letter}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[14px] ${
                choice.is_correct ? "border-[#86EFAC] bg-[#F0FDF4]" : "border-[#E2E8F0]"
              }`}
            >
              <b>{choice.letter})</b>
              {choice.image_url ? <img src={choice.image_url} alt="" className="max-h-16" /> : null}
              <MathJax dynamic>
                <span dangerouslySetInnerHTML={{ __html: choice.text || "" }} />
              </MathJax>
            </div>
          ))}
        </div>
      ) : null}

      {!question.choices.length && (question.text_answer || question.sub_questions.length) ? (
        <div className="mt-3 rounded-xl border border-[#86EFAC] bg-[#F0FDF4] px-3 py-2 text-[14px]">
          <b>{t("aiSolutions.correct")}: </b>
          <MathJax dynamic inline>
            <span
              dangerouslySetInnerHTML={{
                __html: question.text_answer || question.sub_questions.map((s) => s.answer).join("; "),
              }}
            />
          </MathJax>
        </div>
      ) : null}

      {/* Yechim */}
      <div className="mt-4">
        {question.solution ? (
          <HandwrittenSolution data={question.solution.data} mode={localMode} labels={SHEET_LABELS[lang]} />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-[#E2E8F0] py-8 text-[14px] text-[#94A3B8]">
            {busy ? t("aiSolutions.solving") + "…" : t("aiSolutions.notSolved")}
          </div>
        )}
        {error ? <Alert className="!mt-3" type="error" showIcon message={error} /> : null}
      </div>
    </Card>
  );
};

/** Admin: mavzu savollarini AI bilan yechish — progress, qisqa va batafsil yechim */
const AISolutionTopic = () => {
  const { t } = useTranslation();
  const { id = "" } = useParams();
  const [params] = useSearchParams();
  const lang = (params.get("lang") === "ru" ? "ru" : "uz") as AILang;
  const queryClient = useQueryClient();
  const queryKey = ["ai-solutions-topic", id, lang];

  const [mode, setMode] = useState<SolutionMode>("short");
  const [busy, setBusy] = useState<Record<number, boolean>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [run, setRun] = useState<RunState>({ running: false, total: 0, done: 0, failed: 0, current: [] });
  const stopRef = useRef(false);

  const { data: config } = useQuery({ queryKey: ["ai-solutions-config"], queryFn: getAISolutionConfig });
  const { data: topic, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => getAISolutionTopic(id, lang),
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // Sahifadan chiqib ketilsa navbatdagi savollar yuborilmaydi
  useEffect(() => () => void (stopRef.current = true), []);

  const questions = topic?.questions || [];
  const solvedCount = questions.filter((q) => q.solution).length;

  const putQuestion = (updated: AIQuestion) =>
    queryClient.setQueryData<AITopicDetail>(queryKey, (old) =>
      old ? { ...old, questions: old.questions.map((q) => (q.id === updated.id ? updated : q)) } : old,
    );

  const solveOne = async (question: AIQuestion, force: boolean) => {
    setBusy((b) => ({ ...b, [question.id]: true }));
    setErrors((e) => {
      const next = { ...e };
      delete next[question.id];
      return next;
    });
    try {
      // Ko'rinayotgan tildagi yechim bor bo'lsa: ruscha bor — demak o'zbekchasi ham bor
      const has = Boolean(question.solution);
      const updated = await processQuestion(question.id, lang, {
        force,
        hasUz: has,
        hasRu: lang === "ru" && has,
        hasImages: question.has_images,
        shouldStop: () => stopRef.current,
      });
      if (updated) putQuestion(updated);
      return true;
    } catch (err: any) {
      setErrors((e) => ({ ...e, [question.id]: errorMessage(err, t("aiSolutions.failed")) }));
      return false;
    } finally {
      setBusy((b) => ({ ...b, [question.id]: false }));
    }
  };

  // Navbat: savollar ketma-ket (CONCURRENCY tadan) yuboriladi, progress har javobdan keyin yangilanadi
  const runAll = async (force: boolean) => {
    const queue = questions.filter((q) => force || !q.solution);
    if (!queue.length) return;
    stopRef.current = false;
    setRun({ running: true, total: queue.length, done: 0, failed: 0, current: [] });

    const worker = async () => {
      while (queue.length && !stopRef.current) {
        const question = queue.shift() as AIQuestion;
        setRun((r) => ({ ...r, current: [...r.current, question.id] }));
        const ok = await solveOne(question, force);
        setRun((r) => ({
          ...r,
          done: r.done + 1,
          failed: r.failed + (ok ? 0 : 1),
          current: r.current.filter((qid) => qid !== question.id),
        }));
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    setRun((r) => ({ ...r, running: false, current: [] }));
    queryClient.invalidateQueries({ queryKey: ["ai-solutions-tree"] });
  };

  const percent = run.total ? Math.round((run.done * 100) / run.total) : 0;
  const currentIndex = run.current.length ? questions.findIndex((q) => q.id === run.current[0]) + 1 : 0;

  return (
    <MathJaxContext config={MATHJAX_CONFIG}>
      <div className="space-y-5">
        <Card className="!rounded-2xl">
          <Link
            to={`/ai-solutions?lang=${lang}`}
            className="mb-3 inline-flex items-center gap-1.5 text-[14px] text-[#5D87FF]"
          >
            <LuArrowLeft /> {t("aiSolutions.back")}
          </Link>
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 1 }} />
          ) : topic ? (
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-[13px] text-[#64748B]">
                  {[topic.class_name && `${topic.class_name}${t("aiSolutions.classSuffix")}`, topic.subject, topic.chapter]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
                <h1 className="mt-1 text-[22px] font-bold text-[#0F172A]">{topic.name}</h1>
                <div className="mt-1 text-[14px] text-[#64748B]">
                  {questions.length} {t("aiSolutions.questions")} · {solvedCount} {t("aiSolutions.solved")}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Segmented
                  value={mode}
                  onChange={(value) => setMode(value as SolutionMode)}
                  options={[
                    { value: "short", label: t("aiSolutions.short") },
                    { value: "detailed", label: t("aiSolutions.detailed") },
                  ]}
                />
                {run.running ? (
                  <Button danger icon={<LuCircleStop />} onClick={() => (stopRef.current = true)}>
                    {t("aiSolutions.stop")}
                  </Button>
                ) : (
                  <>
                    <Button
                      type="primary"
                      icon={<LuSparkles />}
                      disabled={!config?.configured || solvedCount === questions.length}
                      onClick={() => runAll(false)}
                    >
                      {t("aiSolutions.solveAll")}
                    </Button>
                    <Popconfirm title={t("aiSolutions.resolveConfirm")} onConfirm={() => runAll(true)}>
                      <Button icon={<LuRefreshCw />} disabled={!config?.configured || !questions.length}>
                        {t("aiSolutions.resolveAll")}
                      </Button>
                    </Popconfirm>
                  </>
                )}
              </div>
            </div>
          ) : null}

          {config && !config.configured ? (
            <Alert className="!mt-4" type="warning" showIcon message={t("aiSolutions.notConfigured")} />
          ) : null}

          {run.total ? (
            <div className="mt-5 rounded-xl bg-[#F8FAFF] p-4">
              <div className="mb-1 flex flex-wrap justify-between gap-2 text-[14px]">
                <span className="font-medium text-[#0F172A]">
                  {run.running
                    ? `${t("aiSolutions.solving")}: ${currentIndex ? `${currentIndex}-${t("aiSolutions.question")}` : "…"}`
                    : t("aiSolutions.progressDone")}
                </span>
                <span className="text-[#64748B]">
                  {run.done}/{run.total}
                  {run.failed ? ` · ${run.failed} ${t("aiSolutions.errors")}` : ""}
                </span>
              </div>
              <Progress
                percent={percent}
                status={run.running ? "active" : run.failed ? "exception" : "success"}
                strokeColor={{ from: "#5D87FF", to: "#7C3AED" }}
              />
            </div>
          ) : null}
        </Card>

        {!isLoading && topic && !questions.length ? (
          <Card className="!rounded-2xl">
            <Empty description={t("aiSolutions.noQuestions")} />
          </Card>
        ) : null}

        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            lang={lang}
            mode={mode}
            busy={Boolean(busy[question.id])}
            error={errors[question.id]}
            onSolve={(force) => solveOne(question, force)}
          />
        ))}
      </div>
    </MathJaxContext>
  );
};

export default AISolutionTopic;
