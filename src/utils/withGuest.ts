import { parseCookies } from "nookies";

export function withSSRGuest(ctx: any) {
  const { "SEAD-00": token, "SEAD-01": profile } = parseCookies(ctx);
  if (token) {
    if (profile === "teacher") {
      return {
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      };
    }if (profile === "cma") {
      return {
        redirect: {
          destination: "/matriculas/cma",
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/ava",
          permanent: false,
        },
      };
    }
  }
}
