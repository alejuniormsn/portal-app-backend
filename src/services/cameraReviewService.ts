import { ModelStatic } from "sequelize";
import resp from "../shared/messages/resp";
import { Op } from "sequelize";
import CameraReview from "../database/models/camera_review/CameraReview";
import CameraStatus from "../database/models/camera_review/CameraStatus";
import CameraOccurrence from "../database/models/camera_review/CameraOccurrence";
import CameraReviewOccurrence from "../database/models/camera_review/CameraReviewOccurrence";
import CameraReviewStatus from "../database/models/camera_review/CameraReviewStatus";
import {
  CustomError,
  handleDatabaseError,
} from "../shared/error/handleDatabaseError";

export interface ICameraReview {
  id?: number;
  monitor_registration: number;
  car: number;
  date_camera: Date;
  date_occurrence: Date;
  reviewed_by?: string;
  date_review?: Date;
  there_video?: number;
  video_path?: string;
  comment: string;
  camera_occurrence: number;
  camera_status: number;
  driver_registration?: number;
  ra_globus?: string;
  created_at: Date;
  updated_at?: Date;
}

export interface IChangeStatusCameraReview {
  camera_status: number;
  comment: string;
  reviewed_by: string;
  date_review: Date;
  video_path: string;
  there_video: number;
  updated_at: Date;
}

export interface ICameraReviewOptions {
  id?: number;
  name: string;
  f23: boolean;
  created_at: Date;
}

export interface ICameraReviewOptionsStatus {
  id?: number;
  name: string;
  cod_department: number;
  created_at: Date;
}

export interface IFilter {
  search?: number;
  startedDate: string;
  endDate: string;
}

export interface ICameraReviewSupport {
  camera_status: number;
  updated_at: Date;
}

class CameraReviewService {
  private model: ModelStatic<CameraReview> = CameraReview;
  private modelStatus: ModelStatic<CameraStatus> = CameraStatus;
  private modelOccurrence: ModelStatic<CameraOccurrence> = CameraOccurrence;

  async getAllCameraReviews(filter: IFilter) {
    const dateWeekly = new Date().setDate(new Date().getDate() - 15);
    const whereConditions = {
      ...(filter.search != 0 && { car: filter.search }),
      ...(filter.startedDate != "0" ||
      filter.endDate != "0" ||
      filter.search != 0
        ? {
            date_camera: {
              [Op.between]: [
                filter.startedDate != "0" ? filter.startedDate : 0,
                filter.endDate != "0"
                  ? filter.endDate
                  : new Date().setHours(20, 59, 59, 999),
              ],
            },
          }
        : {
            date_camera: {
              [Op.between]: [
                new Date(dateWeekly).setHours(-3, 0, 0, 0),
                new Date().setHours(20, 59, 59, 999),
              ],
            },
          }),
    };
    try {
      const cameraReviews = await this.model.findAll({
        where: whereConditions,
        include: [
          { model: CameraOccurrence, as: "camera_occurrence" },
          { model: CameraStatus, as: "camera_status" },
        ],
        order: [
          ["date_camera", "DESC"],
          ["car", "ASC"],
        ],
      });
      if (!cameraReviews.length) {
        throw {
          status: 404,
          message: "Camera Reviews not found",
        } as unknown as CustomError;
      }
      return resp(200, cameraReviews);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getCameraReview(id: number) {
    try {
      const cameraReview = await this.model.findOne({
        where: { id: id },
        include: [
          { model: CameraOccurrence, as: "camera_occurrence" },
          { model: CameraStatus, as: "camera_status" },
        ],
      });
      if (!cameraReview) {
        throw {
          status: 404,
          message: "Camera Reviews not found",
        } as unknown as CustomError;
      }
      return resp(200, cameraReview);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createdCameraReview(cameraReview: ICameraReview) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const createdCameraReview = await this.model.create(
        { ...cameraReview },
        { transaction: t }
      );
      await Promise.all([
        CameraReviewOccurrence.create(
          {
            camera_review_id: createdCameraReview.id,
            camera_occurrence_id: cameraReview.camera_occurrence,
          },
          { transaction: t }
        ),
        CameraReviewStatus.create(
          {
            camera_review_id: createdCameraReview.id,
            camera_status_id: cameraReview.camera_status,
          },
          { transaction: t }
        ),
      ]);
      await t.commit();
      return resp(200, createdCameraReview);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateStatusCameraReview(
    id: number,
    cameraReview: IChangeStatusCameraReview
  ) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedRow] = await this.model.update(cameraReview, {
        where: { id: id },
        transaction: t,
      });
      if (affectedRow === 0) {
        throw resp(
          400,
          `Changes to cameraReview with ID ${id} not implemented, check data`
        );
      }
      const [affectedCount] = await CameraReviewStatus.update(
        { camera_status_id: cameraReview.camera_status },
        { where: { camera_review_id: id }, transaction: t }
      );
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to cameraReviewStatus with ID ${id} not implemented, check data`
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

  async updateCameraReview(id: number, cameraReview: ICameraReview) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedCount] = await this.model.update(cameraReview, {
        where: { id: id },
        transaction: t,
      });
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to cameraReview with ID ${id} not implemented, check data`
        );
      }
      await Promise.all([
        CameraReviewOccurrence.update(
          { camera_occurrence_id: cameraReview.camera_occurrence },
          { where: { camera_review_id: id }, transaction: t }
        ),
        CameraReviewStatus.update(
          { camera_status_id: cameraReview.camera_status },
          { where: { camera_review_id: id }, transaction: t }
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

  async deleteCameraReview(id: number) {
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
        throw resp(400, `Camera Review with ID ${id} not found`);
      }
      await Promise.all([
        CameraReviewOccurrence.destroy({
          where: { camera_review_id: id },
          transaction: t,
        }),
        CameraReviewStatus.destroy({
          where: { camera_review_id: id },
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

  async getAllCameraReviewStatus() {
    try {
      const cameraReviewStatus = await this.modelStatus.findAll();
      if (!cameraReviewStatus.length) {
        throw {
          status: 404,
          message: "Camera Reviews Status not found",
        } as unknown as CustomError;
      }
      return resp(200, cameraReviewStatus);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createCameraReviewStatus(
    cameraReviewStatus: ICameraReviewOptionsStatus[]
  ) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const cameraReview_status = cameraReviewStatus.map((e) => ({
        name: e.name,
        cod_department: e.cod_department,
        created_at: e.created_at,
      }));
      const statusCameraReview = await this.modelStatus.bulkCreate(
        cameraReview_status,
        { transaction: t }
      );
      await t.commit();
      return resp(200, statusCameraReview);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getAllCameraReviewOccurrence() {
    try {
      const cameraReviewOccurrence = await this.modelOccurrence.findAll({
        order: [["name", "ASC"]],
      });
      if (!cameraReviewOccurrence.length) {
        throw {
          status: 404,
          message: "Camera Reviews Occurrence not found",
        } as unknown as CustomError;
      }
      return resp(200, cameraReviewOccurrence);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createCameraReviewOccurrence(
    cameraReviewOccurrence: ICameraReviewOptions[]
  ) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const occurrences = cameraReviewOccurrence.map((e) => ({
        name: e.name,
        f23: e.f23,
        created_at: e.created_at,
      }));
      const occurrenceCameraReview = await this.modelOccurrence.bulkCreate(
        occurrences,
        { transaction: t }
      );
      await t.commit();
      return resp(200, occurrenceCameraReview);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async changeStatusCameraReviewSupport(
    id: number,
    cameraReview: ICameraReviewSupport
  ) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      await Promise.all([
        CameraReviewStatus.update(
          { camera_status_id: cameraReview.camera_status },
          { where: { camera_review_id: id }, transaction: t }
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

export default CameraReviewService;
