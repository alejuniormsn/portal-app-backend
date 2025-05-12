import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import messages from "./shared/messages/message";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(500)
    .json(messages(500, [{ error: `Server unavailable - ${err.message}` }]));
});

export default app;
