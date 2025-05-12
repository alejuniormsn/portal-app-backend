import { NextFunction, Request, Response } from "express";
import messages from "../shared/messages/message";
import schema from "./validations/schemaMaintenanceCar";
import MaintenanceCarService, {
  IFilter,
} from "../services/maintenanceCarService";

class maintenanceCarController {
  private service = new MaintenanceCarService();

  async getAllMaintenanceCars(req: Request, res: Response, next: NextFunction) {
    try {
      const { busca, dataInicio, dataFim } = req.query;
      const filter: IFilter = {
        search: Number(busca),
        startedDate: dataInicio!.toString(),
        endDate: dataFim!.toString(),
      };
      const { status, message } = await this.service.getAllMaintenanceCars(
        filter
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getMaintenanceCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getMaintenanceCar(
        Number(id)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createMaintenanceCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.maintenanceCar.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createMaintenanceCar(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateMaintenanceCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.maintenanceCarUpdate.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateMaintenanceCar(
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

  async updateStatusMaintenanceCar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.maintenanceCarStatus.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateStatusMaintenanceCar(
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

  async deleteMaintenanceCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteMaintenanceCar(
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

  async getAllMaintenanceTypes(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } = await this.service.getAllMaintenanceTypes();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createMaintenanceType(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.maintenanceOptions.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createMaintenanceType(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllMaintenanceStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } = await this.service.getAllMaintenanceStatus();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createMaintenanceStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.maintenanceOptionsStatus.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createMaintenanceStatus(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllMaintenanceDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } = await this.service.getAllMaintenanceDetails();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createMaintenanceDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.maintenanceOptions.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createMaintenanceDetail(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async changeStatusMaintenanceSupport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.changeStatusMaintenanceSupport.validate(
        req.body
      );
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } =
        await this.service.changeStatusMaintenanceSupport(Number(id), req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
}

export default maintenanceCarController;
