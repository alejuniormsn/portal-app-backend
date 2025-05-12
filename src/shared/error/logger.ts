import fs from "fs";
import path from "path";
import { dateNow } from "../workingWithDates";
import { env } from "../../environment";

const logPath = path.join(`${env.LOG_PATH}`, "errors.log");

const logError = (message: string, errormessage: string) => {
  const logMessage = `${dateNow()} - ${message} - ${errormessage}\n`;
  fs.appendFileSync(logPath, logMessage);
};

export default logError;
