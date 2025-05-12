import { NextFunction, Request, Response } from "express";
import messages from "../shared/messages/message";
import schema from "./validations/schemaVehicle";
import VehicleService from "../services/vehicleService";

class VehicleController {
  private service = new VehicleService();

  async getAllVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllVehicles();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getVehicle(Number(id));
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createdVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.vehicle.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createVehicle(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.vehicleUpdate.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateVehicle(
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

  async deleteVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteVehicle(Number(id));
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
}

export default VehicleController;
