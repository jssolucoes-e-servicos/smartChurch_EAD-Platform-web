import Router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContextData, AuthProviderProps, SignInCredentials, User } from '../@types/basic';
import { api } from '../services/apiClient';

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'smartEAD.token');
  authChannel.postMessage('signOut');
  Router.push('/login');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [ modalSelectChurchOpen, setModalSelectChurchOpen ] = useState<boolean>(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = message => {
      switch (message.data) {
        case 'signOut':
          signOut();
          authChannel.close();
          break;

        default:
          break;
      }
    };
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    const toastId = toast.loading("Processando acesso...");
    try {
      const {data: {
        access_token: token,
        user: dbUser
      }} = await api.post('auth/login', {
        email,
        password
      });

      let churchesAproved = Array();
      dbUser.PersonsOnChurches.map( church => {
        if (church.permitEAD === 'true') {
          churchesAproved.push(church);
        }
      });
      if (churchesAproved.length === 0){
        throw new Error("Usuário sem vinculo nesta plataforma");
      } else {
        setCookie(undefined, 'smartEAD.token', token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        });
        api.defaults.headers['x-access-token'] = token;
        setUser({
          email,
        });
    }

        
      




 






      /* const { token } = response.data; */

      /* setCookie(undefined, 'smartEAD.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      }); */

    /*   api.defaults.headers['x-access-token'] = token; */

    /*   setUser({
        email,
      });
 */
     // Router.push('/app');
    } catch (err) {
      toast.update(toastId, { render: `Ops! ${err}`, type: "error", isLoading: false });
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user, modalSelectChurchOpen }}>
      {children}
    </AuthContext.Provider>
  );
}