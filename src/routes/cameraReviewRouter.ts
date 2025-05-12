import { Router } from "express";
import { verifyToken } from "../jwt/jwt";
import CameraReviewController from "../controllers/cameraReviewController";

const control = new CameraReviewController();

const cameraReviewRouter = Router();

cameraReviewRouter.get(
  "/camera-reviews",
  verifyToken,
  control.getAllCameraReviews.bind(control)
);

cameraReviewRouter.get(
  "/camera-review/:id",
  verifyToken,
  control.getCameraReview.bind(control)
);

cameraReviewRouter.put(
  "/camera-review/:id",
  verifyToken,
  control.updateCameraReview.bind(control)
);

cameraReviewRouter.patch(
  "/camera-review/:id",
  verifyToken,
  control.updateStatusCameraReview.bind(control)
);

cameraReviewRouter.delete(
  "/camera-review/:id",
  verifyToken,
  control.deleteCameraReview.bind(control)
);

cameraReviewRouter.post(
  "/camera-review",
  verifyToken,
  control.createdCameraReview.bind(control)
);

cameraReviewRouter.get(
  "/camera-review-occurrence",
  verifyToken,
  control.getAllCameraReviewOccurrence.bind(control)
);

cameraReviewRouter.post(
  "/camera-review-occurrence",
  verifyToken,
  control.createCameraReviewOccurrence.bind(control)
);

cameraReviewRouter.get(
  "/camera-review-status",
  verifyToken,
  control.getAllCameraReviewStatus.bind(control)
);

cameraReviewRouter.post(
  "/camera-review-status",
  verifyToken,
  control.createCameraReviewStatus.bind(control)
);

cameraReviewRouter.patch(
  "/camera-review-support/:id",
  verifyToken,
  control.changeStatusCameraReviewSupport.bind(control)
);

export default cameraReviewRouter;
