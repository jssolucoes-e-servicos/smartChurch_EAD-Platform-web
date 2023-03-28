import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { getAPIClient } from './axios';


const api = getAPIClient();
const { "SEAD-01": profile } = parseCookies();

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      toast.error("O tempo de sua seção expirou, faça login novamente.");
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
      return {
        redirect: {
          destination: destiny,
          permanent: false,
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;