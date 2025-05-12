import axios, { AxiosInstance } from "axios";
import resp from "../../shared/messages/resp";
import { handleDatabaseError } from "../../shared/error/handleDatabaseError";
import { env } from "../../environment";

const apiGlobus = async (url: string) => {
  try {
    const api = axios.create({
      baseURL: env.BASE_URL_API_GLOBUS,
      timeout: 7000, // 7 segundos
    }) as AxiosInstance;
    const { data } = await api.get(url);
    return data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.code === "ECONNABORTED") {
        const erro = handleDatabaseError(err);
        throw resp(
          erro.status,
          "Timeout, the request took longer than expected"
        );
      } else if (err.code === "ERR_BAD_REQUEST") {
        const erro = handleDatabaseError(err);
        throw resp(
          erro.status,
          erro.response.data.message || "Bad request, invalid parameters"
        );
      } else {
        const erro = handleDatabaseError(err);
        throw resp(erro.status, erro.message);
      }
    } else {
      const erro = handleDatabaseError(err);
      throw resp(erro.status, erro.message);
    }
  }
};

export default apiGlobus;
