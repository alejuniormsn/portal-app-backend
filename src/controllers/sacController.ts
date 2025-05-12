import { NextFunction, Request, Response } from "express";
import messages from "../shared/messages/message";
import schema from "./validations/schemaSac";
import SacService, { IFilter } from "../services/sacService";

class SacController {
  private service = new SacService();

  async getAllSacs(req: Request, res: Response, next: NextFunction) {
    try {
      const { busca, dataInicio, dataFim } = req.query;
      const filter: IFilter = {
        search: busca?.toString(),
        startedDate: dataInicio!.toString(),
        endDate: dataFim!.toString(),
      };
      const { status, message } = await this.service.getAllSacs(filter);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getSac(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getSac(Number(id));
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateSac(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.sacUpdate.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateSac(
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

  async updateTreatment(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.treatmentUpdate.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateTreatment(
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

  async deleteTreatment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteTreatment(
        Number(id)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createdTreatment(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.sacTreatment.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createdTreatment(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
  async updateSacTreatment(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.treatmentSacUpdate.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateSacTreatment(
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

  async getBySacIdTreatment(req: Request, res: Response, next: NextFunction) {
    try {
      const { sacId } = req.params;
      const { status, message } = await this.service.getBySacIdTreatment(
        Number(sacId)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateStatusSac(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.sacStatusUpdate.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateStatusSac(
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

  async createdSac(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.sac.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createdSac(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async deleteSac(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteSac(Number(id));
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllSacStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllSacStatus();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllSacOccurrenceType(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } = await this.service.getAllSacOccurrenceType();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllSacSourceChannel(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } = await this.service.getAllSacSourceChannel();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllSacGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllSacGroup();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllRelatedTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllRelatedTicket();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllPriority(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllPriority();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
}

export default SacController;
