import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import MaintenanceCar from "./MaintenanceCar";
import MaintenanceDetail from "./MaintenanceDetail";

class MaintenanceCarDetail extends Model {
  declare maintenance_car_id: number;
  declare detail_id: number;
}

MaintenanceCarDetail.init(
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
    detail_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "maintenance_detail",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "maintenance_car_detail",
    timestamps: false,
    underscored: false,
  }
);

MaintenanceCar.belongsToMany(MaintenanceDetail, {
  foreignKey: "maintenance_car_id",
  otherKey: "detail_id",
  as: "details",
  through: MaintenanceCarDetail,
});

MaintenanceDetail.belongsToMany(MaintenanceCar, {
  foreignKey: "detail_id",
  otherKey: "maintenance_car_id",
  as: "maintenances",
  through: MaintenanceCarDetail,
});

export default MaintenanceCarDetail;
