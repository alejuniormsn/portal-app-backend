import { ModelStatic, Op } from "sequelize";
import User from "../database/models/User/User";
import resp from "../shared/messages/resp";
import { sing } from "../jwt/jwt";
import AccessGroup from "../database/models/shared/AccessGroup";
import Department from "../database/models/shared/Department";
import apiGlobus from "./api/apiGlobus";
import {
  CustomError,
  handleDatabaseError,
} from "../shared/error/handleDatabaseError";

interface ILogin {
  registration: number;
  password?: string;
}

interface IUser {
  id?: number;
  registration: number;
  cpf: string;
  name: string;
  email: string;
  motherName: string;
  occurrence?: string;
  phone: string;
  password: string;
  access_group: number;
  last_modified_by?: number;
  department: Array<number>;
  name_main_department: string;
  access_level: Array<JSON>;
  created_at: Date;
  updated_at?: Date;
}

interface IGroup {
  id?: number;
  access_group: number;
  group: Array<JSON>;
  group_name: string;
  created_at?: Date;
  updated_at?: Date;
}

interface IDepartment {
  id?: number;
  name: string;
  access: JSON;
  created_at: Date;
  updated_at?: Date;
}

interface IUserApi {
  chapafunc: string;
  nome_func: string;
  nome_mae: string;
  telefone: string;
  cpf: string;
  email: string | null;
  nascimento: string;
  base64: string;
}

class UserService {
  private model: ModelStatic<User> = User;
  private modelGroup: ModelStatic<AccessGroup> = AccessGroup;
  private modelDepartment: ModelStatic<Department> = Department;

  async login(user: ILogin) {
    try {
      const userRecord = await this.model.findOne({
        where: { ...user },
        attributes: { exclude: ["password"] },
      });
      if (!userRecord) {
        throw {
          status: 404,
          message: "User not found or invalid credentials",
        } as unknown as CustomError;
      }
      const {
        id,
        registration,
        name,
        email,
        access_group,
        department,
        name_main_department,
        access_level,
      } = userRecord.get();
      const jwt = sing({ registration, name });
      return resp(200, {
        user: {
          id,
          registration,
          name,
          email,
          access_group,
          department,
          name_main_department,
          access_level,
        },
        token: jwt,
      });
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.model.findAll({
        attributes: { exclude: ["password"] },
        order: [["name", "ASC"]],
      });
      if (!users.length) {
        throw {
          status: 404,
          message: "Users not found",
        } as unknown as CustomError;
      }
      return resp(200, users);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllUsersByGroup(access_group: number) {
    try {
      const users = await this.model.findAll({
        where: { access_group: access_group },
        attributes: { exclude: ["password"] },
      });
      if (!users.length) {
        throw {
          status: 404,
          message: "Users not found",
        } as unknown as CustomError;
      }
      return resp(200, users);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getUser(id: number) {
    try {
      const user = await this.model.findOne({
        where: { id: id },
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        throw {
          status: 404,
          message: "User not found",
        } as unknown as CustomError;
      }
      return resp(200, user);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getUserByName(name: string) {
    try {
      const users = await this.model.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        attributes: { exclude: ["password"] },
        limit: 50,
      });
      if (!users.length) {
        throw {
          status: 404,
          message: "Users not found",
        } as unknown as CustomError;
      }
      return resp(200, users);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getUserByRegistration(registration: number) {
    try {
      const user = await this.model.findOne({
        where: { registration: registration },
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        throw {
          status: 404,
          message: "User not found",
        } as unknown as CustomError;
      }
      return resp(200, user);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async register(user: IUser) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const createdUser = await this.model.create(
        { ...user },
        { transaction: t }
      );
      await t.commit();
      return resp(201, createdUser);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updatePassword(id: number, user: IUser) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedCount] = await this.model.update(
        { ...user },
        { where: { id }, transaction: t }
      );
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to User with ID ${id} not implemented, check data`
        );
      }
      await t.commit();
      return resp(200, { success: "Password changed successfully" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateUser(id: number, user: IUser) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedCount] = await this.model.update(
        { ...user },
        { where: { id }, transaction: t }
      );
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to User with ID ${id} not implemented, check the data`
        );
      }
      await t.commit();
      return resp(200, { success: "Users successfully updated" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  // ------- AccessGroup ---------
  async getAllGroups() {
    try {
      const groups = await this.modelGroup.findAll({
        order: [["access_group", "DESC"]],
      });
      if (!groups.length) {
        throw {
          status: 404,
          message: "Groups not found",
        } as unknown as CustomError;
      }
      return resp(200, groups);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getGroupsByGroup(access_group: number) {
    try {
      const group = await this.modelGroup.findOne({
        where: { access_group: access_group },
      });
      if (!group) {
        throw {
          status: 404,
          message: "Group not found",
        } as unknown as CustomError;
      }
      return resp(200, group);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createGroup(group: IGroup) {
    if (!this.modelGroup.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelGroup.sequelize.transaction();
    try {
      const createdGroup = await this.modelGroup.create(
        { ...group },
        { transaction: t }
      );
      await t.commit();
      return resp(201, createdGroup);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateGroup(id: number, group: IGroup) {
    if (!this.modelGroup.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelGroup.sequelize.transaction();
    try {
      const [affectedCount] = await this.modelGroup.update(
        { ...group },
        { where: { id: id }, transaction: t }
      );
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to accessGroup with ID ${id} not implemented, check the data`
        );
      }
      await t.commit();
      return resp(200, { success: "Group successfully updated" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async deleteGroup(id: number) {
    if (!this.modelGroup.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelGroup.sequelize.transaction();
    try {
      const deletedCount = await this.modelGroup.destroy({
        where: { id: id },
        transaction: t,
      });
      if (deletedCount === 0) {
        throw resp(400, `AccessGroup with ID ${id} not found`);
      }
      await t.commit();
      return resp(200, { success: "AccessGroup successfully deleted" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  // ------- Department ---------
  async getAllDepartments() {
    try {
      const department = await this.modelDepartment.findAll({
        order: [["name", "ASC"]],
      });
      if (!department.length) {
        throw {
          status: 404,
          message: "Department not found",
        } as unknown as CustomError;
      }
      return resp(200, department);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getDepartment(id: number) {
    try {
      const department = await this.modelDepartment.findOne({
        where: { id: id },
      });
      if (!department) {
        throw {
          status: 404,
          message: "Department not found",
        } as unknown as CustomError;
      }
      return resp(200, department);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createDepartment(department: IDepartment) {
    if (!this.modelDepartment.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelDepartment.sequelize.transaction();
    try {
      const createdDepartment = await this.modelDepartment.create(
        { ...department },
        { transaction: t }
      );
      await t.commit();
      return resp(201, createdDepartment);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateDepartment(id: number, department: IDepartment) {
    if (!this.modelDepartment.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelDepartment.sequelize.transaction();
    try {
      const [affectedCount] = await this.modelDepartment.update(
        { ...department },
        { where: { id: id }, transaction: t }
      );
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to department with ID ${id} not implemented, check the data`
        );
      }
      await t.commit();
      return resp(200, { success: "Department successfully updated" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async deleteDepartment(id: number) {
    if (!this.modelDepartment.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelDepartment.sequelize.transaction();
    try {
      const deletedCount = await this.modelDepartment.destroy({
        where: { id: id },
        transaction: t,
      });
      if (deletedCount === 0) {
        throw resp(400, `Department with ID ${id} not found`);
      }
      await t.commit();
      return resp(200, { success: "Department successfully deleted" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  // ------- UserApiGlobus ---------
  async getUserApiGlobus(chapafunc: string) {
    try {
      const url = `/consulta-user/${chapafunc}`;
      const result: IUserApi[] = await apiGlobus(url);
      return resp(200, result);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }
}

export default UserService;
