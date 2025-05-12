import { NextFunction, Request, Response } from "express";
import messages from "../shared/messages/message";
import GenderService from "../services/genderService";

class GenderController {
  private service = new GenderService();

  async getAllGender(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllGender();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
}

export default GenderController;
