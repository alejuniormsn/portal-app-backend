import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import MonitoringCar from "./MonitoringCar";
import MonitoringOccurrence from "./MonitoringOccurrence";

class MonitoringCarOccurrence extends Model {
  declare monitoring_car_id: number;
  declare monitoring_occurrence_id: number;
}

MonitoringCarOccurrence.init(
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
    monitoring_occurrence_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "monitoring_occurrence",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "monitoring_car_occurrence",
    timestamps: false,
    underscored: false,
  }
);

MonitoringCar.belongsToMany(MonitoringOccurrence, {
  foreignKey: "monitoring_car_id",
  otherKey: "monitoring_occurrence_id",
  as: "occurrence",
  through: MonitoringCarOccurrence,
});

MonitoringOccurrence.belongsToMany(MonitoringCar, {
  foreignKey: "monitoring_occurrence_id",
  otherKey: "monitoring_car_id",
  as: "monitoring",
  through: MonitoringCarOccurrence,
});

export default MonitoringCarOccurrence;
