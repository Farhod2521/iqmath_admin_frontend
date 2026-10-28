import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Card, Empty, Segmented, Skeleton, Tag } from "antd";
import { LuSparkles } from "react-icons/lu";
import {
  getAISolutionClasses,
  getAISolutionConfig,
  getAISolutionTree,
  type AILang,
  type AITreeTopic,
} from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import SubjectCard from "../components/SubjectCard";

/** Admin: "AI yechimlar" — sinf → fan → bob → mavzu, har mavzuda yechilganlar soni */
const AISolutions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const lang = (params.get("lang") === "ru" ? "ru" : "uz") as AILang;
  const classId = Number(params.get("class")) || undefined;

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    next.set(key, value);
    setParams(next, { replace: true });
  };

  const { data: config } = useQuery({ queryKey: ["ai-solutions-config"], queryFn: getAISolutionConfig });
  const { data: classes, isLoading: classesLoading } = useQuery({
    queryKey: ["ai-solutions-classes"],
    queryFn: getAISolutionClasses,
  });
  const {
    data: tree,
    isLoading: treeLoading,
    error,
  } = useQuery({
    queryKey: ["ai-solutions-tree", classId, lang],
    queryFn: () => getAISolutionTree(classId as number, lang),
    enabled: Boolean(classId),
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // Sinf tanlanmagan bo'lsa — birinchisi
  useEffect(() => {
    if (!classId && classes?.length) setParam("class", String(classes[0].id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId, classes]);

  // Kitob yechilayotgan bo'lsa mavzu yangi oynada ochiladi — navbat to'xtab qolmasin
  const openTopic = (topic: AITreeTopic, newTab = false) => {
    const url = `/ai-solutions/topics/${topic.id}?lang=${lang}`;
    if (newTab) window.open(url, "_blank");
    else navigate(url);
  };

  const classOptions = useMemo(
    () =>
      (classes || []).map((c) => ({
        value: c.id,
        label: /^\d+$/.test(c.name) ? `${c.name}${t("aiSolutions.classSuffix")}` : c.name,
      })),
    [classes, t],
  );

  return (
    <div className="space-y-5">
      <Card className="!rounded-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5D87FF] to-[#7C3AED] text-white">
              <LuSparkles size={22} />
            </span>
            <div>
              <h1 className="text-[20px] font-bold text-[#0F172A]">{t("aiSolutions.title")}</h1>
              <p className="text-[14px] text-[#64748B]">{t("aiSolutions.subtitle")}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {config?.model ? (
              <Tag color="purple" className="!m-0 !rounded-lg !px-3 !py-1">
                {t("aiSolutions.model")}: {config.model}
              </Tag>
            ) : null}
            <Segmented
              value={lang}
              onChange={(value) => setParam("lang", String(value))}
              options={[
                { value: "uz", label: "O‘zbekcha" },
                { value: "ru", label: "Русский" },
              ]}
            />
          </div>
        </div>
        {config && !config.configured ? (
          <Alert className="!mt-4" type="warning" showIcon message={t("aiSolutions.notConfigured")} />
        ) : null}
      </Card>

      <Card className="!rounded-2xl" title={t("aiSolutions.selectClass")}>
        {classesLoading ? (
          <Skeleton.Input active block />
        ) : (
          <div className="overflow-x-auto">
            <Segmented
              size="large"
              value={classId}
              onChange={(value) => setParam("class", String(value))}
              options={classOptions}
            />
          </div>
        )}
      </Card>

      {treeLoading ? <Skeleton active paragraph={{ rows: 6 }} /> : null}

      {!treeLoading && classId && tree && !tree.some((s) => s.chapters.some((c) => c.topics.length)) ? (
        <Card className="!rounded-2xl">
          <Empty description={t("aiSolutions.noTopics")} />
        </Card>
      ) : null}

      {(tree || [])
        .filter((subject) => subject.chapters.some((c) => c.topics.length))
        .map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            lang={lang}
            configured={Boolean(config?.configured)}
            onOpenTopic={openTopic}
          />
        ))}
    </div>
  );
};

export default AISolutions;
