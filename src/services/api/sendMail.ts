import axios, { AxiosInstance } from "axios";
import { env } from "../../environment";

const sendMail = async (payload: any) => {
  try {
    const api = axios.create({
      baseURL: env.BASE_URL_API_SENDMAIL,
      headers: { Authorization: env.SENDMAIL_AUTH },
    }) as AxiosInstance;

    await api.post("/send-email", payload);
  } catch (error) {
    throw new Error("Mail sending server returned error");
  }
};

export default sendMail;
