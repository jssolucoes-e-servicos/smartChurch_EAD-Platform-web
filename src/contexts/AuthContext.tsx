import { PageAppProps, SigningProps } from '@/@types/app';
import api from '@/services/api';
import Router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';


export const AuthContext = createContext({});

export function signOut() {
  destroyCookie(undefined, 'SEAD-00');
  destroyCookie(undefined, 'SEAD-01');
  destroyCookie(undefined, 'SEAD-02');
  Router.replace('/');
}

export function AuthProvider({ children }: PageAppProps) {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;
  /* const {
    "SEAD-02": userCookie
  } = parseCookies();

  useEffect(() => {
    if (userCookie)
      setUser(JSON.parse(userCookie));
  }, []); */



  async function signIn({ username, password, profile }:SigningProps) {
    const toastId = toast.loading("Processando acesso...");
    try {
      const { data: {
        access_token: token,
        user: dbUser
      } } = await api.post('auth/login', {
        churchId: '64988313af13278eca997368',
        app: 'ead',
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
          Router.push('/admin');
          break;
        case "studant":
          Router.push('/ava/meus-cursos');
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