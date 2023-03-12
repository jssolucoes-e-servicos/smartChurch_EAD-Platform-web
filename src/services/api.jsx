import { toast } from "react-toastify";
import { getAPIClient } from './axios';


const api = getAPIClient();

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      toast.error("O tempo de sua seção expirou, faça login novamente.");
      return {
        redirect: {
          destination: "/acesso",
          permanent: false,
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;