import { Router } from "express";
import { verifyToken } from "../jwt/jwt";
import RoController from "../controllers/roController";

const control = new RoController();

const roRouter = Router();

roRouter.post("/ro", verifyToken, control.createRo.bind(control));

roRouter.put("/ro/:id", verifyToken, control.updateRo.bind(control));

roRouter.put(
  "/change-occurrence-type-ro/:id",
  verifyToken,
  control.updateChangeOccurrenceTypeRo.bind(control)
);

roRouter.delete("/ro/:id", verifyToken, control.deleteRo.bind(control));

roRouter.get("/ro", verifyToken, control.getAllRo.bind(control));

roRouter.get("/ro/:id", verifyToken, control.getRo.bind(control));

roRouter.get(
  "/ro-occurrence-type",
  verifyToken,
  control.getAllRoOccurrenceType.bind(control)
);

roRouter.post(
  "/ro-occurrence-type",
  verifyToken,
  control.createRoOccurrenceType.bind(control)
);

roRouter.get("/ro-status", verifyToken, control.getAllRoStatus.bind(control));

roRouter.post("/ro-status", verifyToken, control.createRoStatus.bind(control));

roRouter.get("/ro-motive", verifyToken, control.getAllRoMotive.bind(control));

roRouter.post("/ro-motive", verifyToken, control.createRoMotive.bind(control));

roRouter.get("/ro-sector", verifyToken, control.getAllRoSector.bind(control));

roRouter.post("/ro-sector", verifyToken, control.createRoSector.bind(control));

roRouter.get(
  "/ro-occurrence",
  verifyToken,
  control.getAllRoOccurrence.bind(control)
);

roRouter.post(
  "/ro-occurrence",
  verifyToken,
  control.createRoOccurrence.bind(control)
);

roRouter.put(
  "/ro-status/:id",
  verifyToken,
  control.updateRoStatus.bind(control)
);

roRouter.put(
  "/ro-assign/:id",
  verifyToken,
  control.updateRoAssignTo.bind(control)
);

roRouter.patch(
  "/ro-support/:id",
  verifyToken,
  control.changeStatusRoSupport.bind(control)
);

export default roRouter;
