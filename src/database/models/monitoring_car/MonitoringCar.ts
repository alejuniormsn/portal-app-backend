import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class MonitoringCar extends Model {
  declare id: number;
  declare monitor_registration: number;
  declare date_check: Date;
  declare car: number;
  declare driver_registration: number;
  declare date_occurrence: Date;
  declare ra_globus: string;
  declare video_path: string;
  declare comment: string;
  declare treatment: string;
  declare inspector_registration: number;
  declare date_inspector: Date;
  declare created_at: Date;
  declare updated_at: Date;
}

MonitoringCar.init(
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
    date_check: {
      type: sequelize.DATE,
      allowNull: false,
    },
    car: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    driver_registration: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    date_occurrence: {
      type: sequelize.DATE,
      allowNull: false,
    },
    ra_globus: {
      type: sequelize.STRING,
      allowNull: true,
    },
    video_path: {
      type: sequelize.STRING,
      allowNull: true,
    },
    comment: {
      type: sequelize.STRING,
      allowNull: true,
    },
    treatment: {
      type: sequelize.STRING,
      allowNull: true,
    },
    date_inspector: {
      type: sequelize.DATE,
      allowNull: true,
    },
    inspector_registration: {
      type: sequelize.INTEGER,
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
    tableName: "monitoring_car",
    timestamps: false,
    underscored: false,
  }
);

export default MonitoringCar;
