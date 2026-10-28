import { MathJax } from "better-react-mathjax";
import type { ReactNode } from "react";
import type { AISolutionData, AISolutionPart } from "@/services";

export type SolutionMode = "short" | "detailed";

type Labels = {
  given: string;
  find: string;
  formula: string;
  calc: string;
  solution: string;
  answer: string;
};

const INK = "#1E3A8A";

// Qizil ruchka bilan tagiga chizilgan sarlavha ("Berilgan:", "Yechish:" ...)
const RedTitle = ({ children }: { children: ReactNode }) => (
  <div className="w-fit text-[25px] leading-none text-[#DC2626] underline decoration-[#DC2626]/80 decoration-2 underline-offset-[5px]">
    {children}
  </div>
);

// Toza LaTeX qatori (\( \) belgilarisiz keladi)
const Formula = ({ tex, display = false }: { tex: string; display?: boolean }) =>
  tex ? (
    <MathJax inline={!display} dynamic>
      {display ? `\\[${tex}\\]` : `\\(${tex}\\)`}
    </MathJax>
  ) : null;

// Oddiy matn, ichida \( \) formulalar bo'lishi mumkin
const Text = ({ children, className = "" }: { children: string; className?: string }) =>
  children ? (
    <MathJax dynamic className={className}>
      {children}
    </MathJax>
  ) : null;

// Javob — qo'lda chizilgan ellips ichida. text (masalan "B) 6") bo'lsa o'shani, aks holda LaTeX javobni ko'rsatadi
const AnswerOval = ({ label, value, text }: { label: string; value: string; text?: string }) =>
  value || text ? (
    <div className="mt-5 flex flex-wrap items-center gap-4">
      <RedTitle>{label}</RedTitle>
      <span className="inline-flex -rotate-2 items-center rounded-[50%] border-2 border-[#DC2626]/85 px-7 py-2 text-[24px]">
        {text ? <Text className="inline">{text}</Text> : <Formula tex={value} />}
      </span>
    </div>
  ) : null;

const GivenBlock = ({ part, labels }: { part: AISolutionPart; labels: Labels }) => (
  <div className="space-y-1">
    <RedTitle>{labels.given}</RedTitle>
    <div className="space-y-1 pl-3 pt-1">
      {part.given.map((item, i) => (
        <div key={i}>
          <Formula tex={item} />
        </div>
      ))}
    </div>
    {part.find ? (
      <>
        <div className="my-2 h-[2px] w-full rounded-full" style={{ background: INK }} />
        <RedTitle>{labels.find}</RedTitle>
        <div className="pl-3 pt-1">
          <Formula tex={part.find} />
        </div>
      </>
    ) : null}
  </div>
);

type PartProps = { part: AISolutionPart; labels: Labels; answerText?: string };

const ShortPart = ({ part, labels, answerText }: PartProps) => {
  const hasGiven = part.given.length > 0 || Boolean(part.find);
  let n = 0;
  return (
    <div className={hasGiven ? "grid gap-6 md:grid-cols-[minmax(170px,240px)_1fr]" : ""}>
      {hasGiven ? (
        <div className="md:border-r-2 md:pr-6" style={{ borderColor: INK }}>
          <GivenBlock part={part} labels={labels} />
        </div>
      ) : null}
      <div className="min-w-0 space-y-3">
        {part.short.formula ? (
          <div>
            <span className="rounded-lg bg-[#DBEAFE]/70 px-2.5 py-0.5">
              {++n}. {labels.formula}
            </span>
            <div className="ml-4 mt-3 inline-block -rotate-[0.6deg] border-2 px-5 py-1" style={{ borderColor: INK }}>
              <Formula tex={part.short.formula} display />
            </div>
          </div>
        ) : null}
        {part.short.steps.length ? (
          <div>
            <span>
              {++n}. {labels.calc}
            </span>
            <div className="ml-4 mt-1 space-y-1 overflow-x-auto">
              {part.short.steps.map((step, i) => (
                <Formula key={i} tex={step} display />
              ))}
            </div>
          </div>
        ) : null}
        <AnswerOval label={labels.answer} value={part.short.answer} text={answerText} />
      </div>
    </div>
  );
};

const DetailedPart = ({ part, labels, answerText }: PartProps) => (
  <div className="space-y-5">
    {part.given.length || part.find ? (
      <div className="w-fit min-w-[220px] max-w-full pr-6">
        <GivenBlock part={part} labels={labels} />
      </div>
    ) : null}
    <div className="space-y-4">
      <RedTitle>{labels.solution}</RedTitle>
      {part.detailed.steps.map((step, i) => (
        <div key={i} className="pl-3">
          {step.title ? <Text className="text-[23px] font-semibold">{step.title}</Text> : null}
          <Text className="indent-6">{step.text}</Text>
          {step.math.length ? (
            <div className="ml-6 mt-1 space-y-0.5 overflow-x-auto">
              {step.math.map((tex, j) => (
                <Formula key={j} tex={tex} display />
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
    <AnswerOval label={labels.answer} value={part.detailed.answer} text={answerText} />
  </div>
);

type Props = { data: AISolutionData; mode: SolutionMode; labels: Labels };

/** AI yechimi — katakli daftarda ko'k ruchka bilan yozilgandek ko'rinish */
const HandwrittenSolution = ({ data, mode, labels }: Props) => {
  // Bitta misolli savolda umumiy javob ("B) 6") ellips ichiga yoziladi
  const single = data.parts.length === 1;
  return (
  <div
    className="handwritten-sheet overflow-hidden rounded-2xl border border-[#E2E8F0] px-5 py-6 sm:px-8"
    style={{
      color: INK,
      fontFamily: "'Caveat', 'Segoe Print', cursive",
      fontSize: 22,
      lineHeight: 1.55,
      backgroundColor: "#FBFCFF",
      backgroundImage:
        "linear-gradient(#E3E9F6 1px, transparent 1px), linear-gradient(90deg, #E3E9F6 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  >
    <div className="space-y-8">
      {data.parts.map((part, i) => (
        <div key={i}>
          {part.label ? <div className="mb-2 text-[26px] text-[#DC2626]">{part.label}</div> : null}
          {mode === "short" ? (
            <ShortPart part={part} labels={labels} answerText={single ? data.answer : undefined} />
          ) : (
            <DetailedPart part={part} labels={labels} answerText={single ? data.answer : undefined} />
          )}
        </div>
      ))}
    </div>
    {!single && data.answer ? (
      <div className="mt-6 border-t-2 border-dashed pt-4" style={{ borderColor: `${INK}55` }}>
        <span className="text-[#DC2626]">{labels.answer} </span>
        <Text className="inline">{data.answer}</Text>
      </div>
    ) : null}
    {data.conclusion ? <Text className="mt-5 italic">{data.conclusion}</Text> : null}
  </div>
  );
};

export default HandwrittenSolution;
