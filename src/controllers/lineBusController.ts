import { NextFunction, Request, Response } from "express";
import messages from "../shared/messages/message";
import LineBusService from "../services/lineBusService";

class LineBusController {
  private service = new LineBusService();

  async getAllLineBus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllLineBus();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
}

export default LineBusController;
