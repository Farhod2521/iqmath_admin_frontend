import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button, Card, Collapse, Progress, Spin, Tag } from "antd";
import { LuArrowRight, LuBookOpen, LuCircleStop, LuSparkles } from "react-icons/lu";
import type { AILang, AITreeSubject, AITreeTopic } from "@/services";
import { startBookRun, stopBookRun, useBookRun } from "../utils/bookRun";

type Props = {
  subject: AITreeSubject;
  lang: AILang;
  configured: boolean;
  /** newTab — kitob yechilayotganda mavzu yangi oynada ochiladi */
  onOpenTopic: (topic: AITreeTopic, newTab?: boolean) => void;
};

/** Fan (kitob) kartochkasi: boblar va mavzular, hamda butun kitobni boshidan oxirigacha AI bilan yechish */
const SubjectCard = ({ subject, lang, configured, onOpenTopic }: Props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  // Jarayon global saqlanadi — boshqa sinfga o'tib qaytilsa ham progress ko'rinib turadi
  const run = useBookRun(subject.id);

  const chapters = subject.chapters.filter((chapter) => chapter.topics.length);
  const total = chapters.reduce((sum, c) => sum + c.topics.reduce((s, tp) => s + tp.question_count, 0), 0);
  const solved = chapters.reduce((sum, c) => sum + c.topics.reduce((s, tp) => s + tp.solved_count, 0), 0);

  const start = () => startBookRun(subject.id, lang, queryClient, t("aiSolutions.failed"));

  const activeChapters = new Set(run.active.map((a) => a.chapter_id));
  const activeTopics = new Set(run.active.map((a) => a.topic_id));
  const current = run.active[0];
  const currentChapter = current && chapters.find((c) => c.id === current.chapter_id);
  const currentTopic = current && currentChapter?.topics.find((tp) => tp.id === current.topic_id);
  const percent = run.total ? Math.round((run.done * 100) / run.total) : 0;

  return (
    <Card
      className="!rounded-2xl"
      title={
        <span className="flex items-center gap-2">
          <LuBookOpen className="text-[#5D87FF]" />
          {subject.name}
          {!subject.active ? <Tag className="!ml-1">{t("aiSolutions.inactive")}</Tag> : null}
          <span className="text-[13px] font-normal text-[#64748B]">
            · {solved}/{total} {t("aiSolutions.solved")}
          </span>
        </span>
      }
      extra={
        run.running ? (
          <Button danger icon={<LuCircleStop />} onClick={() => stopBookRun(subject.id)}>
            {t("aiSolutions.stop")}
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<LuSparkles />}
            disabled={!configured || !total}
            onClick={start}
          >
            {t("aiSolutions.startBook")}
          </Button>
        )
      }
    >
      {run.running || run.total || run.lastError ? (
        <div className="mb-4 rounded-xl bg-[#F8FAFF] p-4">
          <div className="mb-1 flex flex-wrap justify-between gap-2 text-[14px]">
            <span className="font-medium text-[#0F172A]">
              {run.running
                ? currentChapter
                  ? `${t("aiSolutions.solving")}: ${currentChapter.name}${currentTopic ? ` → ${currentTopic.name}` : ""}`
                  : `${t("aiSolutions.preparing")}…`
                : run.total
                  ? t("aiSolutions.progressDone")
                  : ""}
            </span>
            {run.total ? (
              <span className="text-[#64748B]">
                {run.done}/{run.total}
                {run.failed ? ` · ${run.failed} ${t("aiSolutions.errors")}` : ""}
              </span>
            ) : null}
          </div>
          {run.total ? (
            <Progress
              percent={percent}
              status={run.running ? "active" : run.failed ? "exception" : "success"}
              strokeColor={{ from: "#5D87FF", to: "#7C3AED" }}
            />
          ) : null}
          {run.lastError ? (
            <div className="mt-1 text-[13px] text-[#DC2626]">
              {run.lastError}
              {!run.running && run.failed ? ` — ${t("aiSolutions.retryHint")}` : ""}
            </div>
          ) : null}
        </div>
      ) : null}

      <Collapse
        ghost
        items={chapters.map((chapter) => {
          const chapterTotal = chapter.topics.reduce((sum, tp) => sum + tp.question_count, 0);
          const chapterSolved = chapter.topics.reduce((sum, tp) => sum + tp.solved_count, 0);
          const isActive = activeChapters.has(chapter.id);
          return {
            key: chapter.id,
            label: (
              <div className="flex flex-wrap items-center justify-between gap-2 pr-2">
                <span className={`font-semibold ${isActive ? "text-[#4F46E5]" : "text-[#0F172A]"}`}>
                  {isActive ? <Spin size="small" className="!mr-2" /> : null}
                  {chapter.name}
                </span>
                <span className="flex shrink-0 items-center gap-3 whitespace-nowrap text-[13px] text-[#64748B]">
                  <Progress
                    percent={chapterTotal ? Math.round((chapterSolved * 100) / chapterTotal) : 0}
                    size={[90, 6]}
                    showInfo={false}
                    className="!m-0"
                    strokeColor={{ from: "#5D87FF", to: "#7C3AED" }}
                  />
                  {chapterSolved}/{chapterTotal} {t("aiSolutions.solved")}
                </span>
              </div>
            ),
            children: (
              <div className="divide-y divide-[#EEF2F7]">
                {chapter.topics.map((topic) => {
                  const topicPercent = topic.question_count
                    ? Math.round((topic.solved_count * 100) / topic.question_count)
                    : 0;
                  return (
                    <div key={topic.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium text-[#1E293B]">
                          {activeTopics.has(topic.id) ? <Spin size="small" className="!mr-2" /> : null}
                          {topic.name}
                        </div>
                        <div className="text-[13px] text-[#64748B]">
                          {topic.question_count} {t("aiSolutions.questions")} · {topic.solved_count} {t("aiSolutions.solved")}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress
                          percent={topicPercent}
                          size={[140, 8]}
                          className="!m-0"
                          strokeColor={{ from: "#5D87FF", to: "#7C3AED" }}
                        />
                        <Button
                          type={topicPercent === 100 ? "default" : "primary"}
                          disabled={!topic.question_count}
                          onClick={() => onOpenTopic(topic, run.running)}
                        >
                          {t("aiSolutions.open")}
                          <LuArrowRight />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ),
          };
        })}
      />
    </Card>
  );
};

export default SubjectCard;
