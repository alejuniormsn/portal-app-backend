import { NextFunction, Request, Response } from "express";
import messages from "../shared/messages/message";
import CityService from "../services/cityService";

class cityController {
  private service = new CityService();

  async getAllCities(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllCities();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getCity(Number(id));
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
}

export default cityController;
