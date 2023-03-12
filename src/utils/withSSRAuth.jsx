import { destroyCookie, parseCookies } from "nookies";

export function withSSRAuth(ctx) {
  const { "SEAD-00": token } = parseCookies(ctx);
  if (!token) {
    destroyCookie(ctx, "SEAD-00");
    destroyCookie(ctx, "SEAD-01");
    destroyCookie(ctx, "SEAD-02");
    return {
      redirect: {
        destination: "/acesso",
        permanent: false,
      },
    };
  }
}
