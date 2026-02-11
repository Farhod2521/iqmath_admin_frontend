import { getAuthProviders, getAuthCSRF, postAuthCallbackLogIn } from "@/http";

type LoginPayload = { phone: string; password: string; csrfToken: string };

export async function nextAuthLikeLogin(payload: LoginPayload) {
  // 3) callback/credentials
  // NextAuth format: Form Data (urlencoded)
  const form = new URLSearchParams();
  form.set("phone", payload.phone);
  form.set("password", payload.password);
  form.set("redirect", "false");
  form.set("csrfToken", payload.csrfToken);
  form.set("json", "true");

  const res = await postAuthCallbackLogIn(form);

  return res;
}
