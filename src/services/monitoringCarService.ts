import { ModelStatic } from "sequelize";
import resp from "../shared/messages/resp";
import { Op } from "sequelize";
import MonitoringCar from "../database/models/monitoring_car/MonitoringCar";
import MonitoringCarOccurrenceTypes from "../database/models/monitoring_car/MonitoringCarOccurrenceTypes";
import MonitoringCarOccurrence from "../database/models/monitoring_car/MonitoringCarOccurrence";
import MonitoringCarStatus from "../database/models/monitoring_car/MonitoringCarStatus";
import MonitoringOccurrenceTypes from "../database/models/monitoring_car/MonitoringOccurrenceTypes";
import MonitoringStatus from "../database/models/monitoring_car/MonitoringStatus";
import MonitoringOccurrence from "../database/models/monitoring_car/MonitoringOccurrence";
import apiGlobus from "./api/apiGlobus";
import {
  CustomError,
  handleDatabaseError,
} from "../shared/error/handleDatabaseError";

export interface IMonitoringCar {
  id?: number;
  monitor_registration: number;
  date_check: Date;
  car: number;
  driver_registration: number;
  date_occurrence: Date;
  ra_globus: string;
  video_path?: string;
  comment?: string;
  treatment?: string;
  type_occurrence: number;
  occurrence: number;
  monitoring_status: number;
  date_inspector?: Date;
  inspector_registration?: number;
  created_at: Date;
  updated_at?: Date;
}

export interface IChangeStatusMonitoringCar {
  id: number;
  monitoring_status: number;
  date_inspector: Date;
  inspector_registration: number;
  treatment: string;
  updated_at: Date;
}

export interface IMonitoringOptionsStatus {
  id?: number;
  name: string;
  cod_department: number;
}

export interface IMonitoringOptions {
  id?: number;
  name: string;
}

export interface IDriverScale {
  id: string;
  dtsaida: string;
  prefixoveic: string;
  nomefunc: string;
  chapafunc: string;
  descfuncao: string;
  nroficiallinha: string;
  horasaidagaragem: string;
  horarecolhida: string;
}

export interface IFilter {
  search?: number;
  startedDate: string;
  endDate: string;
}

export interface IMonitoringSupport {
  monitoring_status: number;
  updated_at: Date;
}

class MonitoringCarService {
  private model: ModelStatic<MonitoringCar> = MonitoringCar;
  private modelOccurrenceTypes: ModelStatic<MonitoringOccurrenceTypes> =
    MonitoringOccurrenceTypes;
  private modelStatus: ModelStatic<MonitoringStatus> = MonitoringStatus;
  private modelOccurrence: ModelStatic<MonitoringOccurrence> =
    MonitoringOccurrence;

  async getAllMonitoringCars(filter: IFilter) {
    const weekly = new Date().setDate(new Date().getDate() - 7);
    const whereConditions = {
      ...(filter.search != 0 && { car: filter.search }),
      ...(filter.startedDate != "0" ||
      filter.endDate != "0" ||
      filter.search != 0
        ? {
            date_check: {
              [Op.between]: [
                filter.startedDate != "0" ? filter.startedDate : 0,
                filter.endDate != "0"
                  ? filter.endDate
                  : new Date().setHours(20, 59, 59, 999),
              ],
            },
          }
        : {
            date_check: {
              [Op.between]: [
                new Date(weekly).setHours(-3, 0, 0, 0),
                new Date().setHours(20, 59, 59, 999),
              ],
            },
          }),
    };
    try {
      const monitoringCars = await this.model.findAll({
        where: whereConditions,
        include: [
          { model: MonitoringOccurrenceTypes, as: "type_occurrence" },
          { model: MonitoringOccurrence, as: "occurrence" },
          { model: MonitoringStatus, as: "monitoring_status" },
        ],
        order: [
          ["date_check", "DESC"],
          ["car", "ASC"],
        ],
      });
      if (!monitoringCars.length) {
        throw {
          status: 404,
          message: "Monitoring not found",
        } as unknown as CustomError;
      }
      return resp(200, monitoringCars);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getMonitoringCar(id: number) {
    try {
      const monitoringCar = await this.model.findOne({
        where: { id: id },
        include: [
          { model: MonitoringOccurrenceTypes, as: "type_occurrence" },
          { model: MonitoringOccurrence, as: "occurrence" },
          { model: MonitoringStatus, as: "monitoring_status" },
        ],
      });
      if (!monitoringCar) {
        throw {
          status: 404,
          message: "Monitoring Car not found",
        } as unknown as CustomError;
      }
      return resp(200, monitoringCar);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createdMonitoringCar(monitoringCar: IMonitoringCar) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const createdMonitoringCar = await this.model.create(
        { ...monitoringCar },
        { transaction: t }
      );
      await Promise.all([
        MonitoringCarOccurrence.create(
          {
            monitoring_car_id: createdMonitoringCar.id,
            monitoring_occurrence_id: monitoringCar.occurrence,
          },
          { transaction: t }
        ),
        MonitoringCarOccurrenceTypes.create(
          {
            monitoring_car_id: createdMonitoringCar.id,
            monitoring_occurrence_type_id: monitoringCar.type_occurrence,
          },
          { transaction: t }
        ),
        MonitoringCarStatus.create(
          {
            monitoring_car_id: createdMonitoringCar.id,
            monitoring_status_id: monitoringCar.monitoring_status,
          },
          { transaction: t }
        ),
      ]);
      await t.commit();
      return resp(200, createdMonitoringCar);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateStatusMonitoringCar(
    id: number,
    monitoringCar: IChangeStatusMonitoringCar
  ) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedCount] = await this.model.update(monitoringCar, {
        where: { id: id },
        transaction: t,
      });
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to monitoringCar with ID ${id} not implemented, check data`
        );
      }
      const [affectedRow] = await MonitoringCarStatus.update(
        { monitoring_status_id: monitoringCar.monitoring_status },
        { where: { monitoring_car_id: id }, transaction: t }
      );
      if (affectedRow === 0) {
        throw resp(
          400,
          `Changes to monitoringCarStatus with ID ${id} not implemented, check data`
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

  async updateMonitoringCar(id: number, monitoringCar: IMonitoringCar) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedRow] = await this.model.update(monitoringCar, {
        where: { id: id },
        transaction: t,
      });
      if (affectedRow === 0) {
        throw resp(
          400,
          `Changes to monitoringCar with ID ${id} not implemented, check data`
        );
      }
      await Promise.all([
        MonitoringCarOccurrenceTypes.update(
          { monitoring_occurrence_type_id: monitoringCar.type_occurrence },
          { where: { monitoring_car_id: id }, transaction: t }
        ),
        MonitoringCarOccurrence.update(
          { monitoring_occurrence_id: monitoringCar.occurrence },
          { where: { monitoring_car_id: id }, transaction: t }
        ),
        MonitoringCarStatus.update(
          { monitoring_status_id: monitoringCar.monitoring_status },
          { where: { monitoring_car_id: id }, transaction: t }
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

  async deleteMonitoringCar(id: number) {
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
        throw resp(400, `MonitoringCar with ID ${id} not found`);
      }
      await Promise.all([
        MonitoringCarOccurrenceTypes.destroy({
          where: { monitoring_car_id: id },
          transaction: t,
        }),
        MonitoringCarOccurrence.destroy({
          where: { monitoring_car_id: id },
          transaction: t,
        }),
        MonitoringCarStatus.destroy({
          where: { monitoring_car_id: id },
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

  async getAllMonitoringOccurrenceTypes() {
    try {
      const monitoringOccurrenceTypes = await this.modelOccurrenceTypes.findAll(
        {
          order: [["name", "ASC"]],
        }
      );
      if (!monitoringOccurrenceTypes.length) {
        throw {
          status: 404,
          message: "Monitoring Occurrence Types not found",
        } as unknown as CustomError;
      }
      return resp(200, monitoringOccurrenceTypes);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createMonitoringOccurrenceTypes(
    monitoringOccurrenceTypes: IMonitoringOptions[]
  ) {
    if (!this.modelOccurrenceTypes.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelOccurrenceTypes.sequelize.transaction();
    try {
      const occurrenceTypes = await this.modelOccurrenceTypes.bulkCreate(
        monitoringOccurrenceTypes.map((e) => ({ name: e.name })),
        { transaction: t }
      );
      await t.commit();
      return resp(200, occurrenceTypes);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllMonitoringStatus() {
    try {
      const monitoringStatus = await this.modelStatus.findAll();
      if (!monitoringStatus.length) {
        throw {
          status: 404,
          message: "Monitoring Status not found",
        } as unknown as CustomError;
      }
      return resp(200, monitoringStatus);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getDriverScale(dtsaida: string, prefixoveic: string) {
    try {
      const url = `/saida-recolhida/${dtsaida}/${prefixoveic}`;
      const driverScale: IDriverScale[] = await apiGlobus(url);
      return resp(200, driverScale);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createMonitoringStatus(monitoringStatus: IMonitoringOptionsStatus[]) {
    if (!this.modelStatus.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelStatus.sequelize.transaction();
    try {
      const statusMonitoring = await this.modelStatus.bulkCreate(
        monitoringStatus.map((e) => ({
          name: e.name,
          cod_department: e.cod_department,
        })),
        { transaction: t }
      );
      await t.commit();
      return resp(200, statusMonitoring);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllMonitoringOccurrence() {
    try {
      const monitoringOccurrence = await this.modelOccurrence.findAll({
        order: [["name", "ASC"]],
      });
      if (!monitoringOccurrence.length) {
        throw {
          status: 404,
          message: "Monitoring Occurrence not found",
        } as unknown as CustomError;
      }
      return resp(200, monitoringOccurrence);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createMonitoringOccurrence(monitoringOccurrence: IMonitoringOptions[]) {
    if (!this.modelOccurrence.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelOccurrence.sequelize.transaction();
    try {
      const occurrenceMonitoring = await this.modelOccurrence.bulkCreate(
        monitoringOccurrence.map((e) => ({ name: e.name })),
        { transaction: t }
      );
      await t.commit();
      return resp(200, occurrenceMonitoring);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async changeStatusMonitoringSupport(
    id: number,
    monitoringCar: IMonitoringSupport
  ) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    const [updatedCount] = await this.model.update(
      { updated_at: monitoringCar.updated_at },
      { where: { id }, transaction: t }
    );
    if (updatedCount === 0) {
      throw resp(400, "Monitoring car not found");
    }
    try {
      await Promise.all([
        MonitoringCarStatus.update(
          { monitoring_status_id: monitoringCar.monitoring_status },
          { where: { monitoring_car_id: id }, transaction: t }
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

export default MonitoringCarService;
