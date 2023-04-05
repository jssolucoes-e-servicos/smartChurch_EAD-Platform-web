import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';


export const AuthContext = createContext({});

export function signOut() {
  destroyCookie(undefined, 'SEAD-00');
  destroyCookie(undefined, 'SEAD-01');
  destroyCookie(undefined, 'SEAD-02');
  Router.replace('/acesso');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;
  const {
    "SEAD-02": userCookie
  } = parseCookies();

  useEffect(() => {
    if (userCookie)
      setUser(JSON.parse(userCookie));
  }, []);

  async function signIn({ username, password, profile }) {
    const toastId = toast.loading("Processando acesso...");
    try {
      const { data: {
        access_token: token,
        user: dbUser
      } } = await api.post('auth/login', {
        app: "ead",
        profile: profile,
        username,
        password
      });
      setCookie(undefined, 'SEAD-00', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      setCookie(undefined, 'SEAD-01', profile, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      setCookie(undefined, 'SEAD-02', JSON.stringify(dbUser), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setUser(dbUser);
      switch (profile) {
        case "teacher":
          Router.push('/portal/professor');
          break;
        case "studant":
          Router.push('/portal/aluno');
          break;
        case "cma":
          Router.push('/matriculas/cma');
        default:
          break;
      }
      if (profile === "teacher") {

      } else {

      }
      toast.update(toastId, { render: `Login efetuado`, type: "success", isLoading: false });
      toast.dismiss(toastId);
    } catch (err) {
      toast.update(toastId, { render: `Ops! ${err}`, type: "error", isLoading: false });
      console.error(err);
      toast.dismiss(toastId);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}