import { NextFunction, Request, Response } from "express";
import messages from "../shared/messages/message";
import schema from "./validations/schemaMonitoringCar";
import MonitoringCarService, {
  IFilter,
} from "../services/monitoringCarService";

class MonitoringCarController {
  private service = new MonitoringCarService();

  async getAllMonitoringCars(req: Request, res: Response, next: NextFunction) {
    try {
      const { busca, dataInicio, dataFim } = req.query;
      const filter: IFilter = {
        search: Number(busca),
        startedDate: dataInicio!.toString(),
        endDate: dataFim!.toString(),
      };
      const { status, message } = await this.service.getAllMonitoringCars(
        filter
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getMonitoringCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getMonitoringCar(
        Number(id)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createdMonitoringCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.monitoringCar.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createdMonitoringCar(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateMonitoringCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.monitoringCarUpdate.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateMonitoringCar(
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

  async updateStatusMonitoringCar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.monitoringCarStatus.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateStatusMonitoringCar(
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

  async deleteMonitoringCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteMonitoringCar(
        Number(id)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  // ------------------------------------------------------

  async getAllMonitoringOccurrenceTypes(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } =
        await this.service.getAllMonitoringOccurrenceTypes();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createMonitoringOccurrenceTypes(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.monitoringOptions.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } =
        await this.service.createMonitoringOccurrenceTypes(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllMonitoringStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } = await this.service.getAllMonitoringStatus();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getDriverScale(req: Request, res: Response, next: NextFunction) {
    try {
      const { dtsaida } = req.params;
      const { prefixoveic } = req.params;
      const { error } = schema.driverScale.validate({
        dtsaida: dtsaida,
        prefixoveic: prefixoveic,
      });
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.getDriverScale(
        dtsaida,
        prefixoveic
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createMonitoringStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.monitoringOptionsStatus.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createMonitoringStatus(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllMonitoringOccurrence(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } =
        await this.service.getAllMonitoringOccurrence();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createMonitoringOccurrence(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.monitoringOptions.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createMonitoringOccurrence(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async changeStatusMonitoringSupport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.changeStatusMonitoringSupport.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } =
        await this.service.changeStatusMonitoringSupport(Number(id), req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
}

export default MonitoringCarController;
