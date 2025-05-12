import resp from "../shared/messages/resp";
import Sac from "../database/models/sac/Sac";
import Gender from "../database/models/User/Gender";
import Department from "../database/models/shared/Department";
import SacStatus from "../database/models/sac/SacStatus";
import SacSourceChannel from "../database/models/sac/SacSourceChannel";
import SacOccurrenceType from "../database/models/sac/SacOccurrenceType";
import SacGenderRel from "../database/models/sac/SacGenderRel";
import SacStatusRel from "../database/models/sac/SacStatusRel";
import SacDepartmentRel from "../database/models/sac/SacDepartmentRel";
import SacOccurrenceTypeRel from "../database/models/sac/SacOccurrenceTypeRel";
import SacSourceChannelRel from "../database/models/sac/SacSourceChannelRel";
import Priority from "../database/models/shared/Priority";
import SacPriorityRel from "../database/models/sac/SacPriorityRel";
import SacUserRel from "../database/models/sac/SacUserRel";
import SacGroup from "../database/models/sac/SacGroup";
import SacTreatment from "../database/models/sac/SacTreatment";
import User from "../database/models/User/User";
import payloadSendEmailSac from "../shared/messages/sendMailSAC";
import isValidEmail from "../shared/isValidEmail";
import sendMail from "./api/sendMail";
import logError from "../shared/error/logger";
import { Op } from "sequelize";
import { ModelStatic } from "sequelize";
import { getDateMonthAgo, keepStrWithHour } from "../shared/workingWithDates";
import {
  CustomError,
  handleDatabaseError,
} from "../shared/error/handleDatabaseError";

export interface ISac {
  id: number;
  ticket_number: string;
  created_at: Date;
  updated_at?: Date;
  monitor_registration: number;
  sac_status: number;
  title: string;
  history: string;
  name_cli: string;
  phone?: string;
  email?: string;
  rg_cli?: string;
  sac_gender: number;
  sac_occurrence_type: number;
  sac_source_channel: number;
  sac_department: number;
  sac_priority: number;
  sac_user: number;
  sac_group: number;
  car: number;
  line_bus: number;
  related_ticket_list: string;
}

export interface ISacTreatment {
  sac_group: number;
  sac_priority: number;
  employee_involved?: number | null;
  proceeding: number;
  video_path?: string | null;
  updated_at?: string | null;
}

export interface IChangeStatusSac {
  sac_user: number;
  sac_status: number;
  sac_department: number;
  updated_at: Date;
}

export interface ITreatment {
  id?: number;
  sac_id: number;
  department_id: number;
  department_name: string;
  user_name: string;
  user_id: number;
  update_user_name: string;
  update_user_id: number;
  treatment?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IFilter {
  search?: string | { [Op.like]: string };
  startedDate: string;
  endDate: string;
}

class SacService {
  private model: ModelStatic<Sac> = Sac;
  private modelSacStatus: ModelStatic<SacStatus> = SacStatus;
  private modelSacOccurrenceType: ModelStatic<SacOccurrenceType> =
    SacOccurrenceType;
  private modelSacSourceChannel: ModelStatic<SacSourceChannel> =
    SacSourceChannel;
  private modelSacGroup: ModelStatic<SacGroup> = SacGroup;
  private modelPriority: ModelStatic<Priority> = Priority;
  private modelTreatment: ModelStatic<SacTreatment> = SacTreatment;

  async getAllSacs(filter: IFilter) {
    const whereConditions = {
      ...(filter.search != "0" && {
        ticket_number: { [Op.like]: `%${filter.search}` },
      }),
      ...((filter.startedDate != "0" ||
        filter.endDate != "0" ||
        filter.search != "0") && {
        created_at: {
          [Op.between]: [
            filter.startedDate != "0" ? filter.startedDate : 0,
            filter.endDate != "0"
              ? filter.endDate
              : new Date().setHours(20, 59, 59, 999),
          ],
        },
      }),
    };
    const whereInclude = {
      ...(filter.search == "0" &&
        filter.startedDate == "0" &&
        filter.endDate == "0" && { id: { [Op.ne]: 3 } }),
    };
    try {
      const sacs = await this.model.findAll({
        where: whereConditions,
        include: [
          {
            model: SacStatus,
            as: "sac_status",
            where: whereInclude,
          },
          { model: Gender, as: "sac_gender" },
          { model: SacOccurrenceType, as: "sac_occurrence_type" },
          { model: SacSourceChannel, as: "sac_source_channel" },
          { model: Department, as: "sac_department" },
          { model: Priority, as: "sac_priority" },
          { model: User, as: "sac_user" },
        ],
        order:
          filter.search != "0" ||
          filter.startedDate !== "0" ||
          filter.endDate !== "0"
            ? ["created_at"]
            : ["updated_at"],
      });
      if (!sacs.length) {
        throw {
          status: 404,
          message: "Sac not found",
        } as unknown as CustomError;
      }
      return resp(200, sacs);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getSac(id: number) {
    try {
      const sac = await this.model.findOne({
        where: { id: id },
        include: [
          { model: SacStatus, as: "sac_status" },
          { model: Gender, as: "sac_gender" },
          { model: SacOccurrenceType, as: "sac_occurrence_type" },
          { model: SacSourceChannel, as: "sac_source_channel" },
          { model: Department, as: "sac_department" },
          { model: Priority, as: "sac_priority" },
          { model: User, as: "sac_user" },
        ],
      });
      if (!sac) {
        throw {
          status: 404,
          message: "Sac not found",
        } as unknown as CustomError;
      }
      return resp(200, sac);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createdSac(sac: ISac) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const createdSac = await this.model.create(
        { ...sac },
        { transaction: t }
      );
      await Promise.all([
        SacStatusRel.create(
          { sac_id: createdSac.id, sac_status_id: sac.sac_status },
          { transaction: t }
        ),
        SacGenderRel.create(
          { sac_id: createdSac.id, sac_gender_id: sac.sac_gender },
          { transaction: t }
        ),
        SacOccurrenceTypeRel.create(
          {
            sac_id: createdSac.id,
            sac_occurrence_type_id: sac.sac_occurrence_type,
          },
          { transaction: t }
        ),
        SacSourceChannelRel.create(
          {
            sac_id: createdSac.id,
            sac_source_channel_id: sac.sac_source_channel,
          },
          { transaction: t }
        ),
        SacDepartmentRel.create(
          { sac_id: createdSac.id, sac_department_id: sac.sac_department },
          { transaction: t }
        ),
        SacPriorityRel.create(
          { sac_id: createdSac.id, sac_priority_id: sac.sac_priority },
          { transaction: t }
        ),
        SacUserRel.create(
          { sac_id: createdSac.id, sac_user_id: sac.sac_user },
          { transaction: t }
        ),
      ]);
      await t.commit();
      return resp(200, createdSac);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateSac(id: number, sac: ISac) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedCount] = await this.model.update(sac, {
        where: { id },
        transaction: t,
      });
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to sac with ID ${id} not implemented, check data`
        );
      }
      await Promise.all([
        SacStatusRel.update(
          { sac_status_id: sac.sac_status },
          { where: { sac_id: id }, transaction: t }
        ),
        SacGenderRel.update(
          { sac_gender_id: sac.sac_gender },
          { where: { sac_id: id }, transaction: t }
        ),
        SacOccurrenceTypeRel.update(
          { sac_occurrence_type_id: sac.sac_occurrence_type },
          { where: { sac_id: id }, transaction: t }
        ),
        SacSourceChannelRel.update(
          { sac_source_channel_id: sac.sac_source_channel },
          { where: { sac_id: id }, transaction: t }
        ),
        SacUserRel.update(
          { sac_user_id: sac.sac_user },
          { where: { sac_id: id }, transaction: t }
        ),
        SacPriorityRel.update(
          { sac_priority_id: sac.sac_priority },
          { where: { sac_id: id }, transaction: t }
        ),
      ]);

      await t.commit();
      return resp(200, { success: "Changes made successfully" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateSacTreatment(id: number, sacTreatment: ISacTreatment) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedCount] = await this.model.update(sacTreatment, {
        where: { id },
        transaction: t,
      });
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to sacTreatment with ID ${id} not implemented, check data`
        );
      }
      await SacPriorityRel.update(
        { sac_priority_id: sacTreatment.sac_priority },
        { where: { sac_id: id }, transaction: t }
      );
      await t.commit();
      return resp(200, { success: "Changes made successfully" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createdTreatment(treatment: ITreatment) {
    if (!this.modelTreatment.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelTreatment.sequelize.transaction();
    try {
      const createdTreatment = await this.modelTreatment.create(
        { ...treatment },
        { transaction: t }
      );
      await t.commit();
      return resp(200, createdTreatment);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateTreatment(id: number, treatment: ITreatment) {
    if (!this.modelTreatment.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelTreatment.sequelize.transaction();
    try {
      const [affectedCount] = await this.modelTreatment.update(treatment, {
        where: { id },
        transaction: t,
      });
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to Treatment with ID ${id} not implemented, check data`
        );
      }
      await t.commit();
      return resp(200, { success: "Changes made successfully" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async deleteTreatment(id: number) {
    if (!this.modelTreatment.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.modelTreatment.sequelize.transaction();
    try {
      const deletedCount = await this.modelTreatment.destroy({
        where: { id },
        transaction: t,
      });
      if (deletedCount === 0) {
        throw resp(400, `Treatment with ID ${id} not found`);
      }
      await t.commit();
      return resp(200, { success: "Registration successfully deleted" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateStatusSac(id: number, sac: IChangeStatusSac) {
    const RESOLVED = 3;
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedCount] = await this.model.update(
        { updated_at: sac.updated_at },
        { where: { id: id }, transaction: t }
      );
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to Sac with ID ${id} not implemented, check data`
        );
      }
      await Promise.all([
        SacDepartmentRel.update(
          { sac_department_id: sac.sac_department },
          { where: { sac_id: id }, transaction: t }
        ),
        SacStatusRel.update(
          { sac_status_id: sac.sac_status },
          { where: { sac_id: id }, transaction: t }
        ),
        SacUserRel.update(
          { sac_user_id: sac.sac_user },
          { where: { sac_id: id }, transaction: t }
        ),
      ]);
      if (sac.sac_status !== RESOLVED) {
        // mandar e-mail
        await this.postSendEmail(id, sac.sac_user);
      }
      await t.commit();
      return resp(200, { success: "Status successfully updated" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async postSendEmail(sacId: number, userId: number) {
    try {
      const user = await User.findOne({
        where: { id: userId },
        attributes: ["name", "name_main_department", "email"],
      });
      if (!user || !isValidEmail(user.email)) {
        throw Error(
          `SAC invalid user with id ${userId} or email ${user?.email}`
        );
      }
      const sac = await Sac.findOne({
        where: { id: sacId },
        attributes: ["ticket_number", "title", "created_at"],
      });
      if (!sac) {
        throw Error(`SAC not found with id ${sacId}`);
      }
      const { ticket_number, title, created_at } = sac;
      const objSac = {
        ticket_number,
        title,
        sac_created: keepStrWithHour(created_at.toISOString()),
        user_name: user.name,
        user_email: user.email,
        department: user.name_main_department,
      };
      const payload = payloadSendEmailSac(objSac);
      await sendMail(payload);
    } catch (error: any) {
      logError("SAC sending e-mail error:", error.message);
    }
  }

  async deleteSac(id: number) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const deletedCount = await this.model.destroy({
        where: { id },
        transaction: t,
      });
      if (deletedCount === 0) {
        throw resp(400, `SAC with ID ${id} not found`);
      }
      await Promise.all([
        SacStatusRel.destroy({ where: { sac_id: id }, transaction: t }),
        SacGenderRel.destroy({ where: { sac_id: id }, transaction: t }),
        SacOccurrenceTypeRel.destroy({ where: { sac_id: id }, transaction: t }),
        SacSourceChannelRel.destroy({ where: { sac_id: id }, transaction: t }),
        SacDepartmentRel.destroy({ where: { sac_id: id }, transaction: t }),
        SacPriorityRel.destroy({ where: { sac_id: id }, transaction: t }),
        SacUserRel.destroy({ where: { sac_id: id }, transaction: t }),
        this.modelTreatment.destroy({ where: { sac_id: id }, transaction: t }),
      ]);
      await t.commit();
      return resp(200, { success: "Registration successfully deleted" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  //----------------------------------------------------

  async getAllSacStatus() {
    try {
      const sacStatus = await this.modelSacStatus.findAll();
      if (!sacStatus.length) {
        throw {
          status: 404,
          message: "Sac Status not found",
        } as unknown as CustomError;
      }
      return resp(200, sacStatus);
    } catch (error: any) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllSacOccurrenceType() {
    try {
      const sacOccurrenceType = await this.modelSacOccurrenceType.findAll();
      if (!sacOccurrenceType.length) {
        throw {
          status: 404,
          message: "Sac Occurrence Type not found",
        } as unknown as CustomError;
      }
      return resp(200, sacOccurrenceType);
    } catch (error: any) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllSacSourceChannel() {
    try {
      const sacSourceChannel = await this.modelSacSourceChannel.findAll({
        order: [["name", "DESC"]],
      });
      if (!sacSourceChannel.length) {
        throw {
          status: 404,
          message: "Sac Source Channel not found",
        } as unknown as CustomError;
      }
      return resp(200, sacSourceChannel);
    } catch (error: any) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllSacGroup() {
    try {
      const sacGroup = await this.modelSacGroup.findAll({
        order: [["name", "ASC"]],
      });
      if (!sacGroup.length) {
        throw {
          status: 404,
          message: "Sac Group not found",
        } as unknown as CustomError;
      }
      return resp(200, sacGroup);
    } catch (error: any) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllRelatedTicket() {
    try {
      const sacRelatedTicket = await this.model.findAll({
        where: { created_at: { [Op.gte]: getDateMonthAgo(5) } },
        attributes: ["id", "ticket_number", "title"],
        order: [["ticket_number", "ASC"]],
      });
      if (!sacRelatedTicket.length) {
        throw {
          status: 404,
          message: "Sac Related Ticket not found",
        } as unknown as CustomError;
      }
      return resp(200, sacRelatedTicket);
    } catch (error: any) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllPriority() {
    try {
      const priority = await this.modelPriority.findAll({
        order: [["name", "ASC"]],
      });
      if (!priority.length) {
        throw {
          status: 404,
          message: "Priority not found",
        } as unknown as CustomError;
      }
      return resp(200, priority);
    } catch (error: any) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getBySacIdTreatment(sacId: number) {
    try {
      const sacIdTreatment = await this.modelTreatment.findAll({
        where: { sac_id: sacId },
        order: [["created_at", "ASC"]],
      });
      if (!sacIdTreatment.length) {
        throw {
          status: 404,
          message: "Sac Treatment not found",
        } as unknown as CustomError;
      }
      return resp(200, sacIdTreatment);
    } catch (error: any) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }
}

export default SacService;
