import { signOut } from "@/contexts/AuthContext";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function Index() {
  const cookies = parseCookies();
  const userCookie = cookies['smartEAD.user'];
  const tokenCookie = cookies['smartEAD.token'];
  const profileCookie = cookies['smartEAD.profile'];


  useEffect(() => {
    if (!tokenCookie) {
      redirToAccess();
    } else {
      if (!userCookie) {
        redirToAccess();
      } else {
        if (!profileCookie) {
          redirToAccess();
        } else {
          if (profileCookie === 'teacher') {
            Router.replace("/admin");
          } else if (profileCookie === 'studant') {
            Router.replace("/ava");
          } else {
            redirToAccess();
          }
        }
      }
    } else {
      Router.replace("/ava/meus-cursos");
    }
  });

  const redirToAccess = () => {
    signOut();
    Router.replace("/ava/login");
  }

  return <div />;
}
