export const env = {
  APP: "ETT",
  PORT: "3001",
  JWT_SECRET: "SECRET",

  // Integração com Banco de Dados Oracle (Globus)
  BASE_URL_API_GLOBUS: "http://192.168.0.21:8000/globus",

  // Servidor de E-Mail Ubuntu-Server
  BASE_URL_API_SENDMAIL: "http://192.168.0.21:3030",
  SENDMAIL_AUTH: "Basic SECRET",

  // Serviço LOGS
  LOG_PATH: "/home/dev/errorLogs",
  // LOG_PATH: "/home/xeon/errorLogs",
  // LOG_PATH: "/home/alexandre/errorLogs",
};
