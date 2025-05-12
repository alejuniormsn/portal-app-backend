import { dateNow, keepStrWithHour } from "../shared/workingWithDates";
import { ModelStatic, Op } from "sequelize";
import {
  CustomError,
  handleDatabaseError,
} from "../shared/error/handleDatabaseError";
import resp from "../shared/messages/resp";
import RoOccurrenceTypeRel from "../database/models/ro/RoOccurrenceTypeRel";
import RoOccurrenceType from "../database/models/ro/RoOccurrenceType";
import RoOccurrenceRel from "../database/models/ro/RoOccurrenceRel";
import RoOccurrence from "../database/models/ro/RoOccurrence";
import RoBusLineRel from "../database/models/ro/RoBusLineRel";
import RoStatusRel from "../database/models/ro/RoStatusRel";
import RoSectorRel from "../database/models/ro/RoSectorRel";
import BusLine from "../database/models/vehicle/BusLine";
import Vehicle from "../database/models/vehicle/Vehicle";
import RoCityRel from "../database/models/ro/RoCityRel";
import RoStatus from "../database/models/ro/RoStatus";
import RoSector from "../database/models/ro/RoSector";
import RoCarRel from "../database/models/ro/RoCarRel";
import City from "../database/models/shared/City";
import Ro from "../database/models/ro/Ro";
import User from "../database/models/User/User";
import RoUserRel from "../database/models/ro/RoUserRel";
import isValidEmail from "../shared/isValidEmail";
import payloadSendEmailRo from "../shared/messages/sendMailRo";
import sendMail from "./api/sendMail";
import RoMotive from "../database/models/ro/RoMotive";
import RoMotiveRel from "../database/models/ro/RoMotiveRel";
import logError from "../shared/error/logger";
import RoDepartmentRel from "../database/models/ro/RoDepartmentRel";
import Department from "../database/models/shared/Department";
import RoAuditLog from "../database/models/ro/RoAuditLog";
import RoAuditLogRel from "../database/models/ro/RoAuditLogRel";

interface ISelect {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at: Date | null;
  occurrence_type?: Array<number>;
  sector_affected?: Array<number>;
}

export interface IFilter {
  search?: string | { [Op.like]: string };
  startedDate?: string;
  endDate?: string;
}

export interface IRo {
  id?: number;
  occurrence_number: string;
  occurrence_date: string;
  created_at?: string;
  updated_at: string | null;
  date_restore: string | null;
  monitor_registration: number;
  ro_status: number;
  ro_occurrence_type: number;
  ro_car: number | null;
  vehicle_kilometer: number | null;
  ro_bus_line: number;
  employee_involved: number | null;
  ro_city: number;
  location: string;
  ro_sector: number;
  ro_occurrence: number;
  occurrence_detail: string | null;
  direction: number;
  sos: number | null;
  collected: number | null;
  substitution: number | null;
  deviation_realized: string | null;
  occurrence_response: string | null;
  observation: string | null;
  ro_user: number;
  ro_department: number;
  ro_motive: number;
  substitute_vehicle: number | null;
  departure_canceled_go_1: string | null;
  departure_canceled_go_2: string | null;
  departure_canceled_return_1: string | null;
  departure_canceled_return_2: string | null;
  interrupted_output: string | null;
  activeUserId: number;
  activeUser: string;
}

export interface IRoSupport {
  ro_status: number;
  ro_department: number;
  updated_at: Date;
}

type ChangeAssignToRo = {
  updated_at: string;
  ro_user: number;
  ro_department: number;
  occurrence_response: string | null;
  username: string;
  username_old: string;
  activeUserId: number;
  activeUser: string;
};

type ChangeOccurrenceType = {
  occurrenceTypeId: number;
  occurrenceType: string;
  oldOccurrenceType: string;
  activeUserId: number;
  activeUser: string;
};

type ChangeStatusRo = {
  ro_status: number;
  activeUserId: number;
  activeUser: string;
};

class RoService {
  private model: ModelStatic<Ro> = Ro;
  private modelRoOccurrenceType: ModelStatic<RoOccurrenceType> =
    RoOccurrenceType;
  private modelRoStatus: ModelStatic<RoStatus> = RoStatus;
  private modelRoSector: ModelStatic<RoSector> = RoSector;
  private modelRoOccurrence: ModelStatic<RoOccurrence> = RoOccurrence;
  private modelRoMotive: ModelStatic<RoMotive> = RoMotive;
  private modelRoAuditLog: ModelStatic<RoAuditLog> = RoAuditLog;

  async getAllRo(filter: IFilter) {
    const fortnightly = new Date().setDate(new Date().getDate() - 15);
    const whereConditions = {
      ...(filter.search != "0" && {
        occurrence_number: { [Op.like]: `%${filter.search}` },
      }),
      ...(filter.startedDate != "0" ||
      filter.endDate != "0" ||
      filter.search != "0"
        ? {
            created_at: {
              [Op.between]: [
                filter.startedDate != "0" ? filter.startedDate : 0,
                filter.endDate != "0"
                  ? filter.endDate
                  : new Date().setHours(20, 59, 59, 999),
              ],
            },
          }
        : {
            created_at: {
              [Op.between]: [
                new Date(fortnightly).setHours(-3, 0, 0, 0),
                new Date().setHours(20, 59, 59, 999),
              ],
            },
          }),
    };
    try {
      const ro = await this.model.findAll({
        where: whereConditions,
        include: [
          { model: User, as: "ro_user" },
          { model: Vehicle, as: "ro_car" },
          { model: RoStatus, as: "ro_status" },
          { model: BusLine, as: "ro_bus_line" },
          { model: RoOccurrenceType, as: "ro_occurrence_type" },
          { model: Department, as: "ro_department" },
        ],
        order: [["created_at", "DESC"]],
      });
      if (!ro.length) {
        throw {
          status: 404,
          message: "R.O. not found",
        } as unknown as CustomError;
      }
      return resp(200, ro);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getRo(id: number) {
    try {
      const ro = await this.model.findByPk(id, {
        include: [
          { model: City, as: "ro_city" },
          { model: User, as: "ro_user" },
          { model: Vehicle, as: "ro_car" },
          { model: RoMotive, as: "ro_motive" },
          { model: RoSector, as: "ro_sector" },
          { model: RoStatus, as: "ro_status" },
          { model: BusLine, as: "ro_bus_line" },
          { model: RoOccurrence, as: "ro_occurrence" },
          { model: RoOccurrenceType, as: "ro_occurrence_type" },
          { model: Department, as: "ro_department" },
          { model: RoAuditLog, as: "ro_audit_log" },
        ],
      });
      if (!ro) {
        throw {
          status: 404,
          message: "R.O. not found",
        } as unknown as CustomError;
      }
      return resp(200, ro);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllRoOccurrenceType() {
    try {
      const roOccurrenceType = await this.modelRoOccurrenceType.findAll({
        order: [["name", "ASC"]],
      });
      if (!roOccurrenceType.length) {
        throw {
          status: 404,
          message: "R.O. Occurrence Type not found",
        } as unknown as CustomError;
      }
      return resp(200, roOccurrenceType);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllRoStatus() {
    try {
      const roOccurrenceStatus = await this.modelRoStatus.findAll();
      if (!roOccurrenceStatus.length) {
        throw {
          status: 404,
          message: "R.O. Occurrence Status not found",
        } as unknown as CustomError;
      }
      return resp(200, roOccurrenceStatus);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllRoSector() {
    try {
      const roOccurrenceSector = await this.modelRoSector.findAll({
        order: [["name", "ASC"]],
      });
      if (!roOccurrenceSector.length) {
        throw {
          status: 404,
          message: "R.O. Occurrence Sector not found",
        } as unknown as CustomError;
      }
      return resp(200, roOccurrenceSector);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllRoOccurrence() {
    try {
      const roOccurrence = await this.modelRoOccurrence.findAll({
        order: [["name", "ASC"]],
      });
      if (!roOccurrence.length) {
        throw {
          status: 404,
          message: "R.O. Occurrence not found",
        } as unknown as CustomError;
      }
      return resp(200, roOccurrence);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  //Essa abordagem evita duplicidades tanto localmente quanto no banco de dados.
  async createRoOccurrence(roOccurrence: ISelect[]) {
    if (!this.modelRoOccurrence.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelRoOccurrence.sequelize.transaction();
    try {
      const seenNames = new Set<string>();
      const occurrences: any[] = [];
      for (const e of roOccurrence) {
        if (seenNames.has(e.name)) {
          continue;
        }
        seenNames.add(e.name);
        const existingOccurrence = await this.modelRoOccurrence.findOne({
          where: { name: e.name },
          transaction: t,
        });
        if (!existingOccurrence) {
          occurrences.push({
            name: e.name,
            sector_affected: e.sector_affected,
            created_at: e.created_at,
            updated_at: null,
          });
        }
      }
      if (!occurrences.length) {
        throw {
          status: 400,
          message: "There is no event to be created",
        } as unknown as CustomError;
      }
      const occurrence = await this.modelRoOccurrence.bulkCreate(occurrences, {
        transaction: t,
      });
      await t.commit();
      return resp(200, occurrence);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllRoMotive() {
    try {
      const roMotive = await this.modelRoMotive.findAll({
        order: [["name", "ASC"]],
      });
      if (!roMotive.length) {
        throw {
          status: 404,
          message: "R.O. Motive not found",
        } as unknown as CustomError;
      }
      return resp(200, roMotive);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createRoMotive(roMotive: ISelect[]) {
    if (!this.modelRoMotive.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelRoMotive.sequelize.transaction();
    try {
      const seenNames = new Set<string>();
      const motives: any[] = [];
      for (const e of roMotive) {
        if (seenNames.has(e.name)) {
          continue;
        }
        seenNames.add(e.name);
        const existingMotive = await this.modelRoMotive.findOne({
          where: { name: e.name },
          transaction: t,
        });
        if (!existingMotive) {
          motives.push({
            name: e.name,
            created_at: e.created_at,
            occurrence_type: e.occurrence_type,
            updated_at: null,
          });
        }
      }
      if (!motives.length) {
        throw {
          status: 400,
          message: "There is no event to be created",
        } as unknown as CustomError;
      }
      const roMotives = await this.modelRoMotive.bulkCreate(motives, {
        transaction: t,
      });
      await t.commit();
      return resp(200, roMotives);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createRoOccurrenceType(roOccurrenceType: ISelect[]) {
    if (!this.modelRoOccurrenceType.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelRoOccurrenceType.sequelize.transaction();
    try {
      const seenNames = new Set<string>();
      const occurrences: any[] = [];
      for (const e of roOccurrenceType) {
        if (seenNames.has(e.name)) {
          continue;
        }
        seenNames.add(e.name);
        const existingOccurrence = await this.modelRoOccurrenceType.findOne({
          where: { name: e.name },
          transaction: t,
        });
        if (!existingOccurrence) {
          occurrences.push({
            name: e.name,
            created_at: e.created_at,
            updated_at: null,
          });
        }
      }
      if (!occurrences.length) {
        throw {
          status: 400,
          message: "There is no event to be created",
        } as unknown as CustomError;
      }
      const occurrenceType = await this.modelRoOccurrenceType.bulkCreate(
        occurrences,
        { transaction: t }
      );
      await t.commit();
      return resp(200, occurrenceType);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createRoStatus(roStatus: ISelect[]) {
    try {
      const seenNames = new Set<string>();
      const status: any[] = [];
      for (const e of roStatus) {
        if (seenNames.has(e.name)) {
          continue;
        }
        seenNames.add(e.name);
        const existingStatus = await this.modelRoStatus.findOne({
          where: { name: e.name },
        });
        if (!existingStatus) {
          status.push({
            name: e.name,
            created_at: e.created_at,
            updated_at: null,
          });
        }
      }
      if (!status.length) {
        throw {
          status: 400,
          message: "There is no event to be created",
        } as unknown as CustomError;
      }
      const state = await this.modelRoStatus.bulkCreate(status);
      return resp(200, state);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createRoSector(roSector: ISelect[]) {
    try {
      const seenNames = new Set<string>();
      const sectors: any[] = [];
      for (const e of roSector) {
        if (seenNames.has(e.name)) {
          continue;
        }
        seenNames.add(e.name);
        const existingSector = await this.modelRoSector.findOne({
          where: { name: e.name },
        });
        if (!existingSector) {
          sectors.push({
            name: e.name,
            created_at: e.created_at,
            updated_at: null,
          });
        }
      }
      if (!sectors.length) {
        throw {
          status: 400,
          message: "There is no event to be created",
        } as unknown as CustomError;
      }
      const state = await this.modelRoSector.bulkCreate(sectors);
      return resp(200, state);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createRo(ro: IRo) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const createdRo = await this.model.create({ ...ro }, { transaction: t });
      const createdRoAuditLog = await this.modelRoAuditLog.create(
        {
          action: `Novo Registro de Ocorrência nº ${createdRo.occurrence_number}`,
          user_id: ro.activeUserId,
          user_name: ro.activeUser,
          ro_id: createdRo.id,
          created_at: createdRo.created_at,
        },
        { transaction: t }
      );
      await Promise.all([
        RoStatusRel.create(
          { ro_id: createdRo.id, ro_status_id: ro.ro_status },
          { transaction: t }
        ),
        RoOccurrenceTypeRel.create(
          {
            ro_id: createdRo.id,
            ro_occurrence_type_id: ro.ro_occurrence_type,
          },
          { transaction: t }
        ),
        ro.ro_car !== null
          ? RoCarRel.create(
              { ro_id: createdRo.id, ro_car_id: ro.ro_car },
              { transaction: t }
            )
          : Promise.resolve(),
        RoBusLineRel.create(
          { ro_id: createdRo.id, ro_bus_line_id: ro.ro_bus_line },
          { transaction: t }
        ),
        RoCityRel.create(
          { ro_id: createdRo.id, ro_city_id: ro.ro_city },
          { transaction: t }
        ),
        RoSectorRel.create(
          { ro_id: createdRo.id, ro_sector_id: ro.ro_sector },
          { transaction: t }
        ),
        RoOccurrenceRel.create(
          { ro_id: createdRo.id, ro_occurrence_id: ro.ro_occurrence },
          { transaction: t }
        ),
        RoUserRel.create(
          { ro_id: createdRo.id, ro_user_id: ro.ro_user },
          { transaction: t }
        ),
        RoMotiveRel.create(
          { ro_id: createdRo.id, ro_motive_id: ro.ro_motive },
          { transaction: t }
        ),
        RoDepartmentRel.create(
          { ro_id: createdRo.id, ro_department_id: ro.ro_department },
          { transaction: t }
        ),
        RoAuditLogRel.create(
          { ro_id: createdRo.id, ro_audit_id: createdRoAuditLog.id },
          { transaction: t }
        ),
      ]);
      await t.commit();
      return resp(200, createdRo);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateRo(id: number, ro: IRo) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [updatedCount] = await this.model.update(
        { ...ro },
        { where: { id }, transaction: t }
      );
      if (updatedCount === 0) {
        throw resp(400, "Occurrence type not found");
      }
      const createdRoAuditLog = await this.modelRoAuditLog.create(
        {
          action:
            ro.ro_status === 2
              ? `Ocorrência nº ${ro.occurrence_number} finalizada !`
              : `Ocorrência nº ${ro.occurrence_number} alterada por`,
          user_id: ro.activeUserId,
          user_name: ro.activeUser,
          ro_id: id,
          created_at: dateNow(),
        },
        { transaction: t }
      );
      await Promise.all([
        ro.ro_car !== null
          ? RoCarRel.update(
              { ro_car_id: ro.ro_car },
              { where: { ro_id: id }, transaction: t }
            )
          : Promise.resolve(),
        RoUserRel.update(
          { ro_user_id: ro.ro_user },
          { where: { ro_id: id }, transaction: t }
        ),
        RoCityRel.update(
          { ro_city_id: ro.ro_city },
          { where: { ro_id: id }, transaction: t }
        ),
        RoMotiveRel.update(
          { ro_motive_id: ro.ro_motive },
          { where: { ro_id: id }, transaction: t }
        ),
        RoSectorRel.update(
          { ro_sector_id: ro.ro_sector },
          { where: { ro_id: id }, transaction: t }
        ),
        RoStatusRel.update(
          { ro_status_id: ro.ro_status },
          { where: { ro_id: id }, transaction: t }
        ),
        RoBusLineRel.update(
          { ro_bus_line_id: ro.ro_bus_line },
          { where: { ro_id: id }, transaction: t }
        ),
        RoOccurrenceRel.update(
          { ro_occurrence_id: ro.ro_occurrence },
          { where: { ro_id: id }, transaction: t }
        ),
        RoOccurrenceTypeRel.update(
          { ro_occurrence_type_id: ro.ro_occurrence_type },
          { where: { ro_id: id }, transaction: t }
        ),
        RoDepartmentRel.update(
          { ro_department_id: ro.ro_department },
          { where: { ro_id: id }, transaction: t }
        ),
        RoAuditLogRel.create(
          { ro_id: id, ro_audit_id: createdRoAuditLog.id },
          { transaction: t }
        ),
      ]);
      await t.commit();
      return resp(200, "R.O. updated");
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateChangeOccurrenceTypeRo(id: number, params: ChangeOccurrenceType) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const createdRoAuditLog = await this.modelRoAuditLog.create(
        {
          action: `Conversão de ocorrência ${params.oldOccurrenceType} para ${params.occurrenceType}`,
          user_id: params.activeUserId,
          user_name: params.activeUser,
          ro_id: id,
          created_at: dateNow(),
        },
        { transaction: t }
      );
      await Promise.all([
        RoOccurrenceTypeRel.update(
          { ro_occurrence_type_id: params.occurrenceTypeId },
          { where: { ro_id: id }, transaction: t }
        ),
        RoAuditLogRel.create(
          { ro_id: id, ro_audit_id: createdRoAuditLog.id },
          { transaction: t }
        ),
      ]);
      await t.commit();
      return resp(200, "Occurrence type of R.O. updated");
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateRoStatus(id: number, params: ChangeStatusRo) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [updatedCount] = await this.model.update(
        { updated_at: dateNow() },
        { where: { id }, transaction: t }
      );
      if (updatedCount === 0) {
        throw resp(400, "Status not found");
      }
      await RoStatusRel.update(
        { ro_status_id: params.ro_status },
        { where: { ro_id: id }, transaction: t }
      );
      const createdRoAuditLog = await this.modelRoAuditLog.create(
        {
          action: `Alteração de status de "EM ABERTO" para "FECHADO"`,
          user_id: params.activeUserId,
          user_name: params.activeUser,
          ro_id: id,
          created_at: dateNow(),
        },
        { transaction: t }
      );
      await Promise.all([
        RoAuditLogRel.create(
          { ro_id: id, ro_audit_id: createdRoAuditLog.id },
          { transaction: t }
        ),
      ]);
      await t.commit();
      return resp(200, "Status updated");
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateRoAssignTo(id: number, params: ChangeAssignToRo) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [updatedCount] = await this.model.update(
        {
          updated_at: params.updated_at,
          occurrence_response: params.occurrence_response,
        },
        { where: { id }, transaction: t }
      );
      if (updatedCount === 0) {
        throw resp(400, "AssignTo not found");
      }
      const createdRoAuditLog = await this.modelRoAuditLog.create(
        {
          action: `Ocorrência de ${params.username_old} atribuída a ${params.username}`,
          user_id: params.activeUserId,
          user_name: params.activeUser,
          ro_id: id,
          created_at: dateNow(),
        },
        { transaction: t }
      );
      await Promise.all([
        RoUserRel.update(
          { ro_user_id: params.ro_user },
          { where: { ro_id: id }, transaction: t }
        ),
        RoDepartmentRel.update(
          { ro_department_id: params.ro_department },
          { where: { ro_id: id }, transaction: t }
        ),
        RoAuditLogRel.create(
          { ro_id: id, ro_audit_id: createdRoAuditLog.id },
          { transaction: t }
        ),
      ]);
      await t.commit();
      // mandar e-mail.
      this.postSendEmail(id, Number(params.ro_user));
      return resp(200, "R.O. assignment updated");
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async postSendEmail(roId: number, userId: number) {
    try {
      const user = await User.findOne({
        where: { id: userId },
        attributes: ["name", "name_main_department", "email"],
      });
      if (!user || !isValidEmail(user.email)) {
        throw Error(
          `R.O. invalid user with id ${userId} or email ${user?.email}`
        );
      }
      const ro = await Ro.findOne({
        where: { id: roId },
        attributes: ["occurrence_number", "monitor_registration", "created_at"],
      });
      if (!ro) {
        throw Error(`R.O. not found with id ${roId}`);
      }
      const { occurrence_number, monitor_registration, created_at } = ro;
      const objRo = {
        occurrence_number,
        monitor_registration,
        ro_created: keepStrWithHour(created_at.toISOString()),
        user_name: user.name,
        user_email: user.email,
        department: user.name_main_department,
      };
      const payload = payloadSendEmailRo(objRo);
      await sendMail(payload);
    } catch (error: any) {
      logError(`R.O. sendMail error: `, error.message);
    }
  }

  async deleteRo(id: number) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const ro = await this.model.findByPk(id);
      if (!ro) {
        throw resp(400, "R.O. not found");
      }
      await Promise.all([
        RoCityRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoUserRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoMotiveRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoSectorRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoStatusRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoBusLineRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoOccurrenceRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoDepartmentRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoOccurrenceTypeRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoBusLineRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoAuditLog.destroy({ where: { ro_id: id }, transaction: t }),
        RoAuditLogRel.destroy({ where: { ro_id: id }, transaction: t }),
        RoCarRel.destroy({
          where: { ro_id: id },
          transaction: t,
          hooks: false,
        }),
      ]);
      await ro.destroy({ transaction: t });
      await t.commit();
      return resp(200, { message: "RO successfully deleted" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async changeStatusRoSupport(id: number, ro: IRoSupport) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [updatedCount] = await this.model.update(
        { updated_at: ro.updated_at },
        { where: { id }, transaction: t }
      );
      if (updatedCount === 0) {
        throw new Error("R.O. not found");
      }
      await Promise.all([
        RoStatusRel.update(
          { ro_status_id: ro.ro_status },
          { where: { ro_id: id }, transaction: t }
        ),
        RoDepartmentRel.update(
          { ro_department_id: ro.ro_department },
          { where: { ro_id: id }, transaction: t }
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

export default RoService;
