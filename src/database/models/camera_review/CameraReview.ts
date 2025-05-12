import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class CameraReview extends Model {
  declare id: number;
  declare monitor_registration: number;
  declare car: number;
  declare date_camera: Date;
  declare date_occurrence: Date;
  declare reviewed_by: string;
  declare date_review: Date;
  declare there_video: number;
  declare video_path: string;
  declare comment: string;
  declare driver_registration: number;
  declare ra_globus: string;
  declare created_at: Date;
  declare updated_at: Date;
}

CameraReview.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    monitor_registration: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    car: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    date_camera: {
      type: sequelize.DATE,
      allowNull: false,
    },
    date_occurrence: {
      type: sequelize.DATE,
      allowNull: false,
    },
    reviewed_by: {
      type: sequelize.STRING,
      allowNull: true,
    },
    date_review: {
      type: sequelize.DATE,
      allowNull: true,
    },
    there_video: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    video_path: {
      type: sequelize.STRING,
      allowNull: true,
    },
    comment: {
      type: sequelize.STRING,
      allowNull: false,
    },
    driver_registration: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    ra_globus: {
      type: sequelize.STRING,
      allowNull: true,
    },
    created_at: {
      type: sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: sequelize.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "camera_review",
    timestamps: false,
    underscored: false,
  }
);

export default CameraReview;
