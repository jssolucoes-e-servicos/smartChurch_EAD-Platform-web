import { signOut } from "@/contexts/AuthContext";
import Router from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";

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
            Router.replace("/portal/professor/");
          } else if (profileCookie === 'studant') {
            Router.replace("/portal/aluno/");
          } else {
            redirToAccess();
          }
        }
      }
    }
  });

  const redirToAccess = () => {
    signOut();
    Router.replace("/acesso");
  }

  return <div />;
}
