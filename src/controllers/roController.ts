import { NextFunction, Request, Response } from "express";
import messages from "../shared/messages/message";
import RoService, { IFilter } from "../services/roService";
import schema from "./validations/schemaRo";

class roController {
  private service = new RoService();

  async getAllRoOccurrenceType(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } = await this.service.getAllRoOccurrenceType();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createRoOccurrenceType(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.roSelect.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createRoOccurrenceType(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllRoStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllRoStatus();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createRoStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.roSelect.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createRoStatus(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllRoMotive(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllRoMotive();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createRoMotive(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.roMotive.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createRoMotive(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllRoSector(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllRoSector();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createRoSector(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.roSelect.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createRoSector(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllRoOccurrence(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllRoOccurrence();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createRoOccurrence(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.roOccurrence.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createRoOccurrence(
        req.body
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllRo(req: Request, res: Response, next: NextFunction) {
    try {
      const { busca, dataInicio, dataFim } = req.query;
      const filter: IFilter = {
        search: busca?.toString(),
        startedDate: dataInicio!.toString(),
        endDate: dataFim!.toString(),
      };
      const { status, message } = await this.service.getAllRo(filter);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getRo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getRo(Number(id));
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createRo(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.roCreate.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createRo(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateRo(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.roUpdate.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateRo(
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

  async updateChangeOccurrenceTypeRo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error } = schema.roUpdateChangeOccurrenceType.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { id } = req.params;
      const { status, message } =
        await this.service.updateChangeOccurrenceTypeRo(Number(id), req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateRoStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.updateStatusRo.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateRoStatus(
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

  async updateRoAssignTo(req: Request, res: Response, next: NextFunction) {
    const { error } = schema.roUpdateAssignTo.validate(req.body);
    if (error) {
      return res.status(400).json(messages(400, { error: error.message }));
    }
    const { id } = req.params;
    try {
      const { status, message } = await this.service.updateRoAssignTo(
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

  async deleteRo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteRo(Number(id));
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async changeStatusRoSupport(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.changeStatusRoSupport.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.changeStatusRoSupport(
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
}

export default roController;
