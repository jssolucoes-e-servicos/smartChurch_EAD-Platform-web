import axios from "axios";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

export function getAPIClient(ctx) {
  const { "SEAD-00": token } = parseCookies(ctx);
  const URI = "https://smartchurch-backend.onrender.com/api/";
  //const URI = "http://localhost:3111/api";

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
        toast.error("O tempo de sua seção expirou, faça login novamente.");
        return {
          redirect: {
            destination: "/acesso",
            permanent: false,
          },
        };
      }
      return Promise.reject(error);
    }
  );

  return api;
}