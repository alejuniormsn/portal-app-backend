import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import MaintenanceCar from "./MaintenanceCar";
import MaintenanceStatus from "./MaintenanceStatus";

class MaintenanceCarStatus extends Model {
  declare maintenance_car_id: number;
  declare status_id: number;
}

MaintenanceCarStatus.init(
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
    status_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "maintenance_status",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "maintenance_car_status",
    timestamps: false,
    underscored: false,
  }
);

MaintenanceCar.belongsToMany(MaintenanceStatus, {
  foreignKey: "maintenance_car_id",
  otherKey: "status_id",
  as: "status",
  through: MaintenanceCarStatus,
});

MaintenanceStatus.belongsToMany(MaintenanceCar, {
  foreignKey: "status_id",
  otherKey: "maintenance_car_id",
  as: "maintenances",
  through: MaintenanceCarStatus,
});

export default MaintenanceCarStatus;
