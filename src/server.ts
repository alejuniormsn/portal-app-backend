import { env } from "./environment";
import app from "./app";
import ip from "ip";

const PORT = env.PORT || 3001;

app.listen(PORT, () =>
  console.log(
    `\nBackend em Node - Portal Adm e App ETT\nHttp Server Running on IP Address = ${ip.address()}:${PORT} \nTo stop use control + C\n`
  )
);
