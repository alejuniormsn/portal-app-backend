import { Router } from "express";
import { verifyToken } from "../jwt/jwt";
import LineBusController from "../controllers/lineBusController";

const control = new LineBusController();

const lineBusRouter = Router();

lineBusRouter.get(
  "/line-bus",
  verifyToken,
  control.getAllLineBus.bind(control)
);

export default lineBusRouter;
