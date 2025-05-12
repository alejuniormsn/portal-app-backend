import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import MaintenanceCar from "./MaintenanceCar";
import MaintenanceType from "./MaintenanceType";

class MaintenanceCarType extends Model {
  declare maintenance_car_id: number;
  declare type_id: number;
}

MaintenanceCarType.init(
  {
    maintenance_car_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "maintenance_car",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    type_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "maintenance_type",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "maintenance_car_type",
    timestamps: false,
    underscored: false,
  }
);

MaintenanceCar.belongsToMany(MaintenanceType, {
  foreignKey: "maintenance_car_id",
  otherKey: "type_id",
  as: "types",
  through: MaintenanceCarType,
});

MaintenanceType.belongsToMany(MaintenanceCar, {
  foreignKey: "type_id",
  otherKey: "maintenance_car_id",
  as: "maintenances",
  through: MaintenanceCarType,
});

export default MaintenanceCarType;
