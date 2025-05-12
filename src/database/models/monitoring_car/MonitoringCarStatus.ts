import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import MonitoringCar from "./MonitoringCar";
import MonitoringStatus from "./MonitoringStatus";

class MonitoringCarStatus extends Model {
  declare monitoring_car_id: number;
  declare monitoring_status_id: number;
}

MonitoringCarStatus.init(
  {
    monitoring_car_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "monitoring_car",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    monitoring_status_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "monitoring_status",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "monitoring_car_status",
    timestamps: false,
    underscored: false,
  }
);

MonitoringCar.belongsToMany(MonitoringStatus, {
  foreignKey: "monitoring_car_id",
  otherKey: "monitoring_status_id",
  as: "monitoring_status",
  through: MonitoringCarStatus,
});

MonitoringStatus.belongsToMany(MonitoringCar, {
  foreignKey: "monitoring_status_id",
  otherKey: "monitoring_car_id",
  as: "monitoring",
  through: MonitoringCarStatus,
});

export default MonitoringCarStatus;
