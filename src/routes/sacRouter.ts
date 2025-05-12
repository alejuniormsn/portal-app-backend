import { Router } from "express";
import { verifyToken } from "../jwt/jwt";
import SacController from "../controllers/sacController";

const control = new SacController();

const sacRouter = Router();

sacRouter.get("/sacs", verifyToken, control.getAllSacs.bind(control));

sacRouter.get("/sac/:id", verifyToken, control.getSac.bind(control));

sacRouter.post("/sac", verifyToken, control.createdSac.bind(control));

sacRouter.put("/sac/:id", verifyToken, control.updateSac.bind(control));

sacRouter.patch("/sac/:id", verifyToken, control.updateStatusSac.bind(control));

sacRouter.delete("/sac/:id", verifyToken, control.deleteSac.bind(control));

sacRouter.get(
  "/sac-status",
  verifyToken,
  control.getAllSacStatus.bind(control)
);

sacRouter.get(
  "/sac-occurrence-type",
  verifyToken,
  control.getAllSacOccurrenceType.bind(control)
);

sacRouter.get(
  "/sac-source-channel",
  verifyToken,
  control.getAllSacSourceChannel.bind(control)
);

sacRouter.get("/sac-group", verifyToken, control.getAllSacGroup.bind(control));

sacRouter.get(
  "/sac-tickets",
  verifyToken,
  control.getAllRelatedTicket.bind(control)
);

sacRouter.get("/priority", verifyToken, control.getAllPriority.bind(control));

sacRouter.get(
  "/sac-treatment/:sacId",
  verifyToken,
  control.getBySacIdTreatment.bind(control)
);

sacRouter.put(
  "/sac-treatment/:id",
  verifyToken,
  control.updateTreatment.bind(control)
);

sacRouter.delete(
  "/sac-treatment/:id",
  verifyToken,
  control.deleteTreatment.bind(control)
);

sacRouter.post(
  "/sac-treatment",
  verifyToken,
  control.createdTreatment.bind(control)
);

sacRouter.patch(
  "/sac-treatment/:id",
  verifyToken,
  control.updateSacTreatment.bind(control)
);

export default sacRouter;
