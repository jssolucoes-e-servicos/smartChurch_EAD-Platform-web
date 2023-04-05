import { destroyCookie, parseCookies } from "nookies";


export function withSSRAuth(ctx) {
  const { "SEAD-00": token } = parseCookies(ctx);
  if (token === undefined) {

    destroyCookie(ctx, "SEAD-00");
    destroyCookie(ctx, "SEAD-01");
    destroyCookie(ctx, "SEAD-02");
    ctx.res.writeHead(302, { Location: '/acesso' });
    ctx.res.end();
  }
}
