import { ModelStatic } from "sequelize";
import resp from "../shared/messages/resp";
import MaintenanceCar from "../database/models/maintenance_car/MaintenanceCar";
import MaintenanceType from "../database/models/maintenance_car/MaintenanceType";
import MaintenanceDetail from "../database/models/maintenance_car/MaintenanceDetail";
import MaintenanceStatus from "../database/models/maintenance_car/MaintenanceStatus";
import MaintenanceCarType from "../database/models/maintenance_car/MaintenanceCarType";
import MaintenanceCarDetail from "../database/models/maintenance_car/MaintenanceCarDetail";
import MaintenanceCarStatus from "../database/models/maintenance_car/MaintenanceCarStatus";

import { Op } from "sequelize";
import {
  CustomError,
  handleDatabaseError,
} from "../shared/error/handleDatabaseError";

export interface IMaintenanceCar {
  id?: number;
  car: number;
  date_maintenance: Date;
  comments: string;
  types: number;
  details: number;
  status: number;
  registration_source: number;
  approver: number;
  created_at: Date;
  updated_at?: Date;
}

export interface IChangeStatusMaintenanceCar {
  id: number;
  updated_at: Date;
  status: number;
  approver: number;
}

export interface IMaintenanceOptions {
  id?: number;
  name: string;
}

export interface IMaintenanceOptionsStatus {
  id?: number;
  name: string;
  cod_department: number;
}

export interface IFilter {
  search?: number;
  startedDate: string;
  endDate: string;
}

export interface IMaintenanceSupport {
  status: number;
  updated_at: Date;
}

class MaintenanceCarService {
  private model: ModelStatic<MaintenanceCar> = MaintenanceCar;
  private modelTypes: ModelStatic<MaintenanceType> = MaintenanceType;
  private modelStatus: ModelStatic<MaintenanceStatus> = MaintenanceStatus;
  private modelDetail: ModelStatic<MaintenanceDetail> = MaintenanceDetail;

  async getAllMaintenanceCars(filter: IFilter) {
    const whereConditions = {
      ...(filter.search != 0 && { car: filter.search }),
      ...(filter.startedDate != "0" ||
      filter.endDate != "0" ||
      filter.search != 0
        ? {
            date_maintenance: {
              [Op.between]: [
                filter.startedDate != "0" ? filter.startedDate : 0,
                filter.endDate != "0"
                  ? filter.endDate
                  : new Date().setHours(20, 59, 59, 999),
              ],
            },
          }
        : {
            date_maintenance: {
              [Op.between]: [
                new Date().setHours(-3, 0, 0, 0),
                new Date().setHours(20, 59, 59, 999),
              ],
            },
          }),
    };
    try {
      const maintenanceCars = await this.model.findAll({
        where: whereConditions,
        include: [
          { model: MaintenanceType, as: "types" },
          { model: MaintenanceDetail, as: "details" },
          { model: MaintenanceStatus, as: "status" },
        ],
        order: [
          ["date_maintenance", "DESC"],
          ["car", "ASC"],
        ],
      });
      if (!maintenanceCars.length) {
        throw {
          status: 404,
          message: "Maintenance Cars not found",
        } as unknown as CustomError;
      }
      return resp(200, maintenanceCars);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getMaintenanceCar(id: number) {
    try {
      const maintenanceCar = await this.model.findOne({
        where: { id: id },
        include: [
          { model: MaintenanceType, as: "types" },
          { model: MaintenanceDetail, as: "details" },
          { model: MaintenanceStatus, as: "status" },
        ],
      });
      if (!maintenanceCar) {
        throw {
          status: 404,
          message: "Maintenance Cars not found",
        } as unknown as CustomError;
      }
      return resp(200, maintenanceCar);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createMaintenanceCar(maintenanceCar: IMaintenanceCar) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const createdMaintenanceCar = await this.model.create(
        { ...maintenanceCar },
        { transaction: t }
      );
      await Promise.all([
        MaintenanceCarType.create(
          {
            maintenance_car_id: createdMaintenanceCar.id,
            type_id: maintenanceCar.types,
          },
          { transaction: t }
        ),
        MaintenanceCarDetail.create(
          {
            maintenance_car_id: createdMaintenanceCar.id,
            detail_id: maintenanceCar.details,
          },
          { transaction: t }
        ),
        MaintenanceCarStatus.create(
          {
            maintenance_car_id: createdMaintenanceCar.id,
            status_id: maintenanceCar.status,
          },
          { transaction: t }
        ),
      ]);
      await t.commit();
      return resp(200, createdMaintenanceCar);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateStatusMaintenanceCar(
    id: number,
    maintenanceCar: IChangeStatusMaintenanceCar
  ) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedCount] = await this.model.update(maintenanceCar, {
        where: { id: id },
        transaction: t,
      });
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to maintenanceCar with ID ${id} not implemented, check data`
        );
      }
      const affectedRow = await MaintenanceCarStatus.update(
        { status_id: maintenanceCar.status },
        { where: { maintenance_car_id: id }, transaction: t }
      );
      if (affectedRow[0] === 0) {
        throw resp(
          400,
          `Changes to MaintenanceCarStatus with ID ${id} not implemented, check data`
        );
      }
      await t.commit();
      return resp(200, { success: "Successfully changed" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateMaintenanceCar(id: number, maintenanceCar: IMaintenanceCar) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedCount] = await this.model.update(maintenanceCar, {
        where: { id: id },
        transaction: t,
      });
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to maintenanceCar with ID ${id} not implemented, check data`
        );
      }
      await Promise.all([
        MaintenanceCarType.update(
          { type_id: maintenanceCar.types },
          { where: { maintenance_car_id: id }, transaction: t }
        ),
        MaintenanceCarDetail.update(
          { detail_id: maintenanceCar.details },
          { where: { maintenance_car_id: id }, transaction: t }
        ),
        MaintenanceCarStatus.update(
          { status_id: maintenanceCar.status },
          { where: { maintenance_car_id: id }, transaction: t }
        ),
      ]);
      await t.commit();
      return resp(200, { success: "Successfully changed" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async deleteMaintenanceCar(id: number) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const deletedCount = await this.model.destroy({
        where: { id: id },
        transaction: t,
      });
      if (deletedCount === 0) {
        throw resp(400, `MaintenanceCar with ID ${id} not found`);
      }
      await Promise.all([
        MaintenanceCarType.destroy({
          where: { maintenance_car_id: id },
          transaction: t,
        }),
        MaintenanceCarDetail.destroy({
          where: { maintenance_car_id: id },
          transaction: t,
        }),
        MaintenanceCarStatus.destroy({
          where: { maintenance_car_id: id },
          transaction: t,
        }),
      ]);
      await t.commit();
      return resp(200, { success: "Successfully deleted" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  //----------------------------------------------------

  async getAllMaintenanceTypes() {
    try {
      const maintenanceTypes = await this.modelTypes.findAll({
        order: [["id", "ASC"]],
      });
      if (!maintenanceTypes.length) {
        throw {
          status: 404,
          message: "Maintenance Types not found",
        } as unknown as CustomError;
      }
      return resp(200, maintenanceTypes);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createMaintenanceType(maintenanceType: IMaintenanceOptions[]) {
    if (!this.modelTypes.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelTypes.sequelize.transaction();
    try {
      const maintenanceTypes = await this.modelTypes.bulkCreate(
        maintenanceType.map((e) => ({ name: e.name })),
        { transaction: t }
      );
      await t.commit();
      return resp(200, maintenanceTypes);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllMaintenanceStatus() {
    try {
      const maintenanceStatus = await this.modelStatus.findAll();
      if (!maintenanceStatus.length) {
        throw {
          status: 404,
          message: "Maintenance Status not found",
        } as unknown as CustomError;
      }
      return resp(200, maintenanceStatus);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createMaintenanceStatus(
    maintenanceStatus: IMaintenanceOptionsStatus[]
  ) {
    if (!this.modelStatus.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelStatus.sequelize.transaction();
    try {
      const statusMaintenance = await this.modelStatus.bulkCreate(
        maintenanceStatus.map((e) => ({
          name: e.name,
          cod_department: e.cod_department,
        })),
        { transaction: t }
      );
      await t.commit();
      return resp(200, statusMaintenance);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllMaintenanceDetails() {
    try {
      const maintenanceDetail = await this.modelDetail.findAll({
        order: [["name", "ASC"]],
      });
      if (!maintenanceDetail.length) {
        throw {
          status: 404,
          message: "Maintenance Detail not found",
        } as unknown as CustomError;
      }
      return resp(200, maintenanceDetail);
    } catch (error: any) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createMaintenanceDetail(maintenanceDetail: IMaintenanceOptions[]) {
    if (!this.modelDetail.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelDetail.sequelize.transaction();
    try {
      const maintenanceDetails = await this.modelDetail.bulkCreate(
        maintenanceDetail.map((e) => ({ name: e.name })),
        { transaction: t }
      );
      await t.commit();
      return resp(200, maintenanceDetails);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async changeStatusMaintenanceSupport(
    id: number,
    maintenanceCar: IMaintenanceSupport
  ) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    const [updatedCount] = await this.model.update(
      { updated_at: maintenanceCar.updated_at },
      { where: { id }, transaction: t }
    );
    if (updatedCount === 0) {
      throw resp(400, "Maintenance car car not found");
    }
    try {
      await Promise.all([
        MaintenanceCarStatus.update(
          { status_id: maintenanceCar.status },
          { where: { maintenance_car_id: id }, transaction: t }
        ),
      ]);
      await t.commit();
      return resp(200, { success: "Successfully changed status" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }
}

export default MaintenanceCarService;
