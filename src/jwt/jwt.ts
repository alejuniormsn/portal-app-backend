import jwt, { SignOptions } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import messages from "../shared/messages/message";
import { env } from "../environment";

export interface IUser {
  registration: number;
  name: string;
}

const secret = env.JWT_SECRET as string;

const jwtConfig: SignOptions = {
  algorithm: "HS256",
  expiresIn: "12h",
};

const sing = (payload: IUser) => {
  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtStr = req.headers.authorization as string;

    if (!jwtStr) {
      return res
        .status(403)
        .json(messages(403, { error: "Forbidden, invalid token" }));
    }

    let jwtToken = jwtStr.split(" ")[1];
    jwtToken = jwtToken.replace('"', "");
    jwtToken = jwtToken.replace('"', "");

    const decoded = jwt.verify(jwtToken, secret);

    res.locals.user = decoded;
    next();
  } catch (error: any) {
    return res.status(403).json(messages(403, { error: error.message }));
  }
};

export { sing, verifyToken };
