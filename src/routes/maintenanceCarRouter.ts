import { Router } from "express";
import { verifyToken } from "../jwt/jwt";
import MaintenanceCarController from "../controllers/maintenanceCarController";

const control = new MaintenanceCarController();

const maintenanceCarRouter = Router();

maintenanceCarRouter.get(
  "/maintenance-cars",
  verifyToken,
  control.getAllMaintenanceCars.bind(control)
);

maintenanceCarRouter.get(
  "/maintenance-car/:id",
  verifyToken,
  control.getMaintenanceCar.bind(control)
);

maintenanceCarRouter.put(
  "/maintenance-car/:id",
  verifyToken,
  control.updateMaintenanceCar.bind(control)
);

maintenanceCarRouter.patch(
  "/maintenance-car/:id",
  verifyToken,
  control.updateStatusMaintenanceCar.bind(control)
);

maintenanceCarRouter.delete(
  "/maintenance-car/:id",
  verifyToken,
  control.deleteMaintenanceCar.bind(control)
);

maintenanceCarRouter.post(
  "/maintenance-car",
  verifyToken,
  control.createMaintenanceCar.bind(control)
);

maintenanceCarRouter.get(
  "/maintenance-types",
  verifyToken,
  control.getAllMaintenanceTypes.bind(control)
);

maintenanceCarRouter.post(
  "/maintenance-type",
  verifyToken,
  control.createMaintenanceType.bind(control)
);

maintenanceCarRouter.get(
  "/maintenance-details",
  verifyToken,
  control.getAllMaintenanceDetails.bind(control)
);

maintenanceCarRouter.post(
  "/maintenance-detail",
  verifyToken,
  control.createMaintenanceDetail.bind(control)
);

maintenanceCarRouter.get(
  "/maintenance-status",
  verifyToken,
  control.getAllMaintenanceStatus.bind(control)
);

maintenanceCarRouter.post(
  "/maintenance-status",
  verifyToken,
  control.createMaintenanceStatus.bind(control)
);

maintenanceCarRouter.patch(
  "/maintenance-support/:id",
  verifyToken,
  control.changeStatusMaintenanceSupport.bind(control)
);

export default maintenanceCarRouter;
