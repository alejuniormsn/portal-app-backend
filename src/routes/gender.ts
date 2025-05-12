import { Router } from "express";
import { verifyToken } from "../jwt/jwt";
import GenderController from "../controllers/genderController";

const control = new GenderController();

const genderRouter = Router();

genderRouter.get("/gender", verifyToken, control.getAllGender.bind(control));

export default genderRouter;
