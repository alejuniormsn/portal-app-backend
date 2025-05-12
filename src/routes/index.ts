import { Router } from "express";
import userRouter from "./userRouter";
import maintenanceCarRouter from "./maintenanceCarRouter";
import monitoringCarRouter from "./monitoringCarRouter";
import cameraReviewRouter from "./cameraReviewRouter";
import vehicleRouter from "./vehicleRouter";
import sacRouter from "./sacRouter";
import lineBusRouter from "./lineBusRouter";
import genderRouter from "./gender";
import cityRouter from "./cityRouter";
import roRouter from "./roRouter";

const router = Router();

router.use(userRouter);
router.use(maintenanceCarRouter);
router.use(monitoringCarRouter);
router.use(cameraReviewRouter);
router.use(vehicleRouter);
router.use(sacRouter);
router.use(lineBusRouter);
router.use(genderRouter);
router.use(cityRouter);
router.use(roRouter);

export default router;
