import { Router } from "express";
import { verifyToken } from "../jwt/jwt";
import VehicleController from "../controllers/vehicleController";

const control = new VehicleController();

const vehicleRouter = Router();

vehicleRouter.get(
  "/vehicles",
  verifyToken,
  control.getAllVehicles.bind(control)
);
vehicleRouter.get(
  "/vehicle/:id",
  verifyToken,
  control.getVehicle.bind(control)
);
vehicleRouter.put(
  "/vehicle/:id",
  verifyToken,
  control.updateVehicle.bind(control)
);
vehicleRouter.delete(
  "/vehicle/:id",
  verifyToken,
  control.deleteVehicle.bind(control)
);
vehicleRouter.post(
  "/vehicle",
  verifyToken,
  control.createdVehicle.bind(control)
);

export default vehicleRouter;
