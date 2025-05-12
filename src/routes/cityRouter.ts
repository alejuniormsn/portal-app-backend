import { Router } from "express";
import { verifyToken } from "../jwt/jwt";
import CityController from "../controllers/cityController";

const control = new CityController();

const cityRouter = Router();

cityRouter.get(
  "/cities",
  verifyToken,
  control.getAllCities.bind(control)
);
cityRouter.get(
  "/city/:id",
  verifyToken,
  control.getCity.bind(control)
);

export default cityRouter;
