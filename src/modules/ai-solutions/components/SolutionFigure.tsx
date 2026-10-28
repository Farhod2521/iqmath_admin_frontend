import { useMemo } from "react";
import type { AIFigure, AIGraphFigure } from "@/services";

const INK = "#1E3A8A";
const LINE_COLORS = [INK, "#DC2626", "#059669"];

// ------------------------------------------------------------ formula hisoblagich
// AI bergan ifodani (masalan "2x^2 - sqrt(x+1)") eval ishlatmasdan hisoblaydi.

type Fn = (x: number) => number;

const FUNCS: Record<string, (v: number) => number> = {
  sqrt: Math.sqrt,
  abs: Math.abs,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  ln: Math.log,
  log: Math.log10,
  exp: Math.exp,
};
const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E };

const tokenize = (src: string) =>
  src
    .replace(/\*\*/g, "^")
    .replace(/·|×/g, "*")
    .replace(/−/g, "-")
    .match(/\d+(?:\.\d+)?|[a-zA-Z]+|[-+*/^()]/g) || [];

export const compileExpr = (src: string): Fn | null => {
  const tokens = tokenize(src);
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];

  // primary: son, x, konstanta, funksiya(...), (...)
  const primary = (): Fn => {
    const token = next();
    if (token === undefined) throw new Error("end");
    if (/^\d/.test(token)) {
      const value = Number(token);
      return () => value;
    }
    if (token === "(") {
      const inner = expr();
      if (next() !== ")") throw new Error(")");
      return inner;
    }
    const name = token.toLowerCase();
    if (name === "x") return (x) => x;
    if (name in CONSTS) return () => CONSTS[name];
    if (name in FUNCS) {
      const arg = power();
      return (x) => FUNCS[name](arg(x));
    }
    throw new Error(token);
  };
  // daraja (o'ngdan): 2^-x ham ishlaydi
  const power = (): Fn => {
    const base = primary();
    if (peek() === "^") {
      next();
      const exponent = unary();
      return (x) => Math.pow(base(x), exponent(x));
    }
    return base;
  };
  const unary = (): Fn => {
    if (peek() === "-") {
      next();
      const value = unary();
      return (x) => -value(x);
    }
    if (peek() === "+") {
      next();
      return unary();
    }
    return power();
  };
  // ko'paytma: "2x", "3(x+1)", "x sin x" kabi yashirin ko'paytirish ham
  const term = (): Fn => {
    let left = unary();
    for (;;) {
      const token = peek();
      if (token === "*" || token === "/") {
        next();
        const right = unary();
        const l = left;
        left = token === "*" ? (x) => l(x) * right(x) : (x) => l(x) / right(x);
      } else if (token !== undefined && token !== ")" && token !== "+" && token !== "-" && token !== "^") {
        const right = unary();
        const l = left;
        left = (x) => l(x) * right(x);
      } else {
        return left;
      }
    }
  };
  const expr = (): Fn => {
    let left = term();
    while (peek() === "+" || peek() === "-") {
      const op = next();
      const right = term();
      const l = left;
      left = op === "+" ? (x) => l(x) + right(x) : (x) => l(x) - right(x);
    }
    return left;
  };

  try {
    // "y = 2x + 1" ko'rinishida kelsa — tenglikdan keyingi qism
    const fn = expr();
    return pos === tokens.length ? fn : null;
  } catch {
    return null;
  }
};

// ------------------------------------------------------------ grafik

const W = 420;
const H = 300;
const PAD = 26;

const niceStep = (span: number) => {
  const raw = span / 10;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  return [1, 2, 5, 10].map((m) => m * pow).find((s) => s >= raw) || pow * 10;
};

const Graph = ({ figure }: { figure: AIGraphFigure }) => {
  const [x0, x1] = figure.x;
  const [y0, y1] = figure.y;
  const sx = (x: number) => PAD + ((x - x0) / (x1 - x0)) * (W - 2 * PAD);
  const sy = (y: number) => H - PAD - ((y - y0) / (y1 - y0)) * (H - 2 * PAD);
  const axisX = Math.min(Math.max(sy(0), PAD), H - PAD);
  const axisY = Math.min(Math.max(sx(0), PAD), W - PAD);

  const curves = useMemo(
    () =>
      figure.functions.map((f) => {
        const fn = compileExpr(f.expr.replace(/^\s*y\s*=/i, ""));
        if (!fn) return { label: f.label, segments: [] as string[] };
        const segments: string[] = [];
        let current: string[] = [];
        const samples = 400;
        let prevY: number | null = null;
        for (let i = 0; i <= samples; i += 1) {
          const x = x0 + ((x1 - x0) * i) / samples;
          const y = fn(x);
          // Aniqlanmagan nuqta yoki uzilish (masalan 1/x) — chiziq bo'linadi
          const broken = !Number.isFinite(y) || (prevY !== null && Math.abs(y - prevY) > (y1 - y0) * 2);
          if (broken || y < y0 - (y1 - y0) || y > y1 + (y1 - y0)) {
            if (current.length > 1) segments.push(current.join(" "));
            current = [];
            prevY = Number.isFinite(y) ? y : null;
            continue;
          }
          current.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
          prevY = y;
        }
        if (current.length > 1) segments.push(current.join(" "));
        return { label: f.label, segments };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [figure],
  );

  const stepX = niceStep(x1 - x0);
  const stepY = niceStep(y1 - y0);
  const ticksX: number[] = [];
  for (let v = Math.ceil(x0 / stepX) * stepX; v <= x1; v += stepX) if (Math.abs(v) > 1e-9) ticksX.push(+v.toFixed(6));
  const ticksY: number[] = [];
  for (let v = Math.ceil(y0 / stepY) * stepY; v <= y1; v += stepY) if (Math.abs(v) > 1e-9) ticksY.push(+v.toFixed(6));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[420px]" style={{ fontFamily: "inherit" }}>
      <defs>
        <marker id="ai-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={INK} />
        </marker>
        <clipPath id="ai-plot">
          <rect x={PAD} y={PAD - 6} width={W - 2 * PAD} height={H - 2 * PAD + 12} />
        </clipPath>
      </defs>
      {/* o'qlar */}
      <line x1={PAD - 8} y1={axisX} x2={W - 8} y2={axisX} stroke={INK} strokeWidth={1.6} markerEnd="url(#ai-arrow)" />
      <line x1={axisY} y1={H - PAD + 8} x2={axisY} y2={8} stroke={INK} strokeWidth={1.6} markerEnd="url(#ai-arrow)" />
      <text x={W - 14} y={axisX - 8} fill={INK} fontSize={18}>x</text>
      <text x={axisY + 8} y={18} fill={INK} fontSize={18}>y</text>
      {ticksX.map((v) => (
        <g key={`x${v}`}>
          <line x1={sx(v)} y1={axisX - 4} x2={sx(v)} y2={axisX + 4} stroke={INK} strokeWidth={1.2} />
          <text x={sx(v)} y={axisX + 18} fill={INK} fontSize={16} textAnchor="middle">{v}</text>
        </g>
      ))}
      {ticksY.map((v) => (
        <g key={`y${v}`}>
          <line x1={axisY - 4} y1={sy(v)} x2={axisY + 4} y2={sy(v)} stroke={INK} strokeWidth={1.2} />
          <text x={axisY - 8} y={sy(v) + 5} fill={INK} fontSize={16} textAnchor="end">{v}</text>
        </g>
      ))}
      <text x={axisY - 8} y={axisX + 18} fill={INK} fontSize={14} textAnchor="end">0</text>
      {/* funksiyalar */}
      <g clipPath="url(#ai-plot)">
        {curves.map((curve, i) =>
          curve.segments.map((points, j) => (
            <polyline
              key={`${i}-${j}`}
              points={points}
              fill="none"
              stroke={LINE_COLORS[i % LINE_COLORS.length]}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )),
        )}
      </g>
      {/* nuqtalar */}
      {figure.points.map((p, i) => (
        <g key={`p${i}`}>
          <circle cx={sx(p.x)} cy={sy(p.y)} r={4.5} fill="#DC2626" />
          {p.label ? (
            <text x={sx(p.x) + 8} y={sy(p.y) - 8} fill="#DC2626" fontSize={17}>{p.label}</text>
          ) : null}
        </g>
      ))}
      {/* funksiya nomlari */}
      {curves.map((curve, i) =>
        curve.label ? (
          <text key={`l${i}`} x={W - PAD} y={PAD + 6 + i * 22} fill={LINE_COLORS[i % LINE_COLORS.length]} fontSize={18} textAnchor="end">
            {curve.label}
          </text>
        ) : null,
      )}
    </svg>
  );
};

// ------------------------------------------------------------ SVG chizma (AI chizgan)

const ALLOWED_TAGS = new Set(["svg", "g", "line", "polyline", "polygon", "path", "circle", "ellipse", "rect", "text", "tspan", "defs", "marker"]);

/** Faqat oddiy shakl teglari va atributlari qoladi — skript, havola, uslub olib tashlanadi */
const sanitizeSvg = (source: string): string | null => {
  const doc = new DOMParser().parseFromString(source, "image/svg+xml");
  const root = doc.documentElement;
  if (!root || root.nodeName !== "svg" || doc.getElementsByTagName("parsererror").length) return null;
  const walk = (el: Element) => {
    for (const child of Array.from(el.children)) {
      if (!ALLOWED_TAGS.has(child.nodeName)) child.remove();
      else walk(child);
    }
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      if (name.startsWith("on") || name.includes("href") || name === "style" || /url\s*\(\s*['"]?(?!#)/i.test(attr.value)) {
        el.removeAttribute(attr.name);
      }
    }
  };
  walk(root);
  root.removeAttribute("width");
  root.removeAttribute("height");
  root.setAttribute("class", "h-auto w-full max-w-[420px]");
  return new XMLSerializer().serializeToString(root);
};

const SvgFigure = ({ svg }: { svg: string }) => {
  const clean = useMemo(() => sanitizeSvg(svg), [svg]);
  if (!clean) return null;
  // currentColor — ko'k ruchka rangi; matn qo'lyozma shriftda
  return <div style={{ color: INK }} dangerouslySetInnerHTML={{ __html: clean }} />;
};

/** Batafsil yechimdagi chizma: funksiya grafigi yoki AI chizgan SVG */
const SolutionFigure = ({ figure }: { figure: AIFigure }) => (
  <div className="w-full max-w-[420px] shrink-0">
    {figure.type === "graph" ? <Graph figure={figure} /> : <SvgFigure svg={figure.svg} />}
  </div>
);

export default SolutionFigure;
