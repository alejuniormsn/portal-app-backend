import { Router } from "express";
import { verifyToken } from "../jwt/jwt";
import MonitoringCarController from "../controllers/monitoringCarController";

const control = new MonitoringCarController();

const monitoringCarRouter = Router();

monitoringCarRouter.get(
  "/monitoring-cars",
  verifyToken,
  control.getAllMonitoringCars.bind(control)
);
monitoringCarRouter.get(
  "/monitoring-car/:id",
  verifyToken,
  control.getMonitoringCar.bind(control)
);
monitoringCarRouter.put(
  "/monitoring-car/:id",
  verifyToken,
  control.updateMonitoringCar.bind(control)
);
monitoringCarRouter.patch(
  "/monitoring-car/:id",
  verifyToken,
  control.updateStatusMonitoringCar.bind(control)
);
monitoringCarRouter.delete(
  "/monitoring-car/:id",
  verifyToken,
  control.deleteMonitoringCar.bind(control)
);
monitoringCarRouter.post(
  "/monitoring-car",
  verifyToken,
  control.createdMonitoringCar.bind(control)
);

monitoringCarRouter.get(
  "/monitoring-occurrence-types",
  verifyToken,
  control.getAllMonitoringOccurrenceTypes.bind(control)
);
monitoringCarRouter.post(
  "/monitoring-occurrence-type",
  verifyToken,
  control.createMonitoringOccurrenceTypes.bind(control)
);

monitoringCarRouter.get(
  "/monitoring-occurrence",
  verifyToken,
  control.getAllMonitoringOccurrence.bind(control)
);
monitoringCarRouter.post(
  "/monitoring-occurrence",
  verifyToken,
  control.createMonitoringOccurrence.bind(control)
);

monitoringCarRouter.get(
  "/monitoring-status",
  verifyToken,
  control.getAllMonitoringStatus.bind(control)
);

monitoringCarRouter.post(
  "/monitoring-status",
  verifyToken,
  control.createMonitoringStatus.bind(control)
);

monitoringCarRouter.get(
  "/driver-scale/:dtsaida/:prefixoveic",
  verifyToken,
  control.getDriverScale.bind(control)
);

monitoringCarRouter.patch(
  "/monitoring-support/:id",
  verifyToken,
  control.changeStatusMonitoringSupport.bind(control)
);

export default monitoringCarRouter;
