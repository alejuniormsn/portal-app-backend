import { NextFunction, Request, Response } from "express";
import messages from "../shared/messages/message";
import schema from "./validations/schemaCameraReview";
import CameraReviewService, { IFilter } from "../services/cameraReviewService";

class CameraReviewController {
  private service = new CameraReviewService();

  async getAllCameraReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { busca, dataInicio, dataFim } = req.query;
      const filter: IFilter = {
        search: Number(busca),
        startedDate: dataInicio!.toString(),
        endDate: dataFim!.toString(),
      };
      const { status, message } = await this.service.getAllCameraReviews(
        filter
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getCameraReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getCameraReview(
        Number(id)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createdCameraReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.cameraReview.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createdCameraReview(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateCameraReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.cameraReviewUpdate.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateCameraReview(
        Number(id),
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateStatusCameraReview(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.cameraReviewStatus.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateStatusCameraReview(
        Number(id),
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async deleteCameraReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteCameraReview(
        Number(id)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async changeStatusCameraReviewSupport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.changeStatusCameraReviewSupport.validate(
        req.body
      );
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } =
        await this.service.changeStatusCameraReviewSupport(
          Number(id),
          req.body
        );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
  // ------------------------------------------------------

  async getAllCameraReviewStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } = await this.service.getAllCameraReviewStatus();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createCameraReviewStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.cameraReviewOptionsStatus.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createCameraReviewStatus(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllCameraReviewOccurrence(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } =
        await this.service.getAllCameraReviewOccurrence();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createCameraReviewOccurrence(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.cameraReviewOptions.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } =
        await this.service.createCameraReviewOccurrence(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
}

export default CameraReviewController;
