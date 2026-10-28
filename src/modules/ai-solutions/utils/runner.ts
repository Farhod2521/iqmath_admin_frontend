import {
  digitizeQuestionWithAI,
  solveQuestionWithAI,
  translateQuestionWithAI,
  type AILang,
  type AIQuestion,
} from "@/services";

const ATTEMPTS = 3;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** AI vaqtincha javob bermasa yoki buzuq javob qaytarsa — darhol tashlab ketmay, yana urinib ko'radi */
export const withRetry = async <T>(fn: () => Promise<T>, shouldStop?: () => boolean): Promise<T> => {
  let lastError: unknown;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const code = error?.response?.status;
      // So'rovning o'zi noto'g'ri (400/404) yoki ruxsat yo'q — qayta urinishdan foyda yo'q
      if (code && code < 500 && code !== 429) break;
      if (attempt < ATTEMPTS && !shouldStop?.()) await wait(attempt * 3000);
    }
  }
  throw lastError;
};

export const errorMessage = (error: any, fallback: string) =>
  error?.response?.data?.detail || error?.message || fallback;

/**
 * Savolni to'liq tayyorlaydi: matndagi rasm-formulalar LaTeX ga (bo'lsa), o'zbekcha yechim
 * (yo'q bo'lsa yoki force) va uning ruscha tarjimasi. Natija — `viewLang` tilidagi savol ko'rinishi.
 */
export const processQuestion = async (
  id: number,
  viewLang: AILang,
  { force = false, hasUz = false, hasRu = false, hasImages = false, shouldStop }: {
    force?: boolean;
    hasUz?: boolean;
    hasRu?: boolean;
    hasImages?: boolean;
    shouldStop?: () => boolean;
  } = {},
): Promise<AIQuestion | undefined> => {
  let result: AIQuestion | undefined;
  // Misol rasm bo'lib saqlangan — avval bazada formulaga aylantiriladi, keyin yechiladi
  if (hasImages && (force || !hasUz)) {
    result = await withRetry(() => digitizeQuestionWithAI(id, viewLang), shouldStop);
  }
  if (force || !hasUz) {
    result = await withRetry(() => solveQuestionWithAI(id, viewLang, force), shouldStop);
  }
  // force bilan yechilganda eski tarjima o'chirilgan — qaytadan tarjima qilinadi
  if (force || !hasRu || !hasUz) {
    result = await withRetry(() => translateQuestionWithAI(id, viewLang), shouldStop);
  }
  return result;
};
