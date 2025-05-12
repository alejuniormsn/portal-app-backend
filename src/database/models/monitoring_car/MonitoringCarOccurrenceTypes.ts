import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import MonitoringCar from "./MonitoringCar";
import MonitoringOccurrenceTypes from "./MonitoringOccurrenceTypes";

class MonitoringCarOccurrenceTypes extends Model {
  declare monitoring_car_id: number;
  declare monitoring_occurrence_type_id: number;
}

MonitoringCarOccurrenceTypes.init(
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
    monitoring_occurrence_type_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "monitoring_occurrence_type",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "monitoring_car_occurrence_type",
    timestamps: false,
    underscored: false,
  }
);

MonitoringCar.belongsToMany(MonitoringOccurrenceTypes, {
  foreignKey: "monitoring_car_id",
  otherKey: "monitoring_occurrence_type_id",
  as: "type_occurrence",
  through: MonitoringCarOccurrenceTypes,
});

MonitoringOccurrenceTypes.belongsToMany(MonitoringCar, {
  foreignKey: "monitoring_occurrence_type_id",
  otherKey: "monitoring_car_id",
  as: "monitoring",
  through: MonitoringCarOccurrenceTypes,
});

export default MonitoringCarOccurrenceTypes;
