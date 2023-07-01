import axios from "axios";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

export function getAPIClient(ctx) {
  const { "SEAD-00": token } = parseCookies(ctx);
  const { "SEAD-01": profile } = parseCookies(ctx);
  const URI = 'https://smartchurch-backend.onrender.com/';

  const api = axios.create({
    baseURL: URI,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.error(error);
      if (error.response.status === 401) {
        let destiny;
        switch (profile) {
          case "teacher":
            destiny = '/acesso/professor';
            break;
          case "studant":
            destiny = '/acesso/aluno';
            break;
          case "cma":
            destiny = '/matriculas/cma';
          default:
            break;
        }
        toast.error("O tempo de sua seção expirou, faça login novamente.");
        return {
          redirect: {
            destination: destiny,
            permanent: false,
          },
        };
      }
      return Promise.reject(error);
    }
  );

  return api;
}