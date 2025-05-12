import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import messages from "../shared/messages/message";
import schema from "./validations/schemaUser";

class UserController {
  private service = new UserService();

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllUsers();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getAllUsersByGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_group } = req.params;
      const { status, message } = await this.service.getAllUsersByGroup(
        Number(access_group)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getUser(Number(id));
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.params;
      const { status, message } = await this.service.getUserByName(name);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getUserByRegistration(req: Request, res: Response, next: NextFunction) {
    try {
      const { registration } = req.params;
      const { status, message } = await this.service.getUserByRegistration(
        Number(registration)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.login.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.login(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.user.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.register(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.updatePassword.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updatePassword(
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

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.updateUser.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { id } = req.params;
      const { status, message } = await this.service.updateUser(
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

  async getUserApiGlobus(req: Request, res: Response, next: NextFunction) {
    try {
      const { chapafunc } = req.params;
      const { error } = schema.chapafunc.validate({ chapafunc: chapafunc });
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.getUserApiGlobus(
        chapafunc
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  // ------- AccessGroup ---------
  async getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllGroups();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getGroupsByGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_group } = req.params;
      const { status, message } = await this.service.getGroupsByGroup(
        Number(access_group)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteGroup(Number(id));
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.group.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createGroup(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error } = schema.updateGroup.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { status, message } = await this.service.updateGroup(
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

  // ------- Department ---------
  async getAllDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllDepartments();
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async getDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getDepartment(Number(id));
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteDepartment(
        Number(id)
      );
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }

  async updateDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error } = schema.updateDepartment.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, [{ error: error.message }]));
      }
      const { status, message } = await this.service.updateDepartment(
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

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = schema.department.validate(req.body);
      if (error) {
        return res.status(400).json(messages(400, { error: error.message }));
      }
      const { status, message } = await this.service.createDepartment(req.body);
      res.status(status).json(messages(status, message));
    } catch (error: any) {
      res
        .status(error.status)
        .json(messages(error.status, { error: error.message }));
    }
  }
}

export default UserController;
