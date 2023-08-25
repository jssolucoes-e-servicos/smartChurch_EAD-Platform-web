import { parseCookies } from "nookies";

export function withSSRGuest(ctx: any) {
  const { "SEAD-00": token, "SEAD-01": profile } = parseCookies(ctx);
  if (token) {
    if (profile === "teacher") {
      return {
        redirect: {
          destination: "/portal/professor",
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/portal/aluno",
          permanent: false,
        },
      };
    }
  }
}
