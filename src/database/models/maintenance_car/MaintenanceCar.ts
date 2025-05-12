import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class MaintenanceCar extends Model {
  declare id: number;
  declare car: number;
  declare date_maintenance: Date;
  declare registration_source: number;
  declare approver: number;
  declare comments: string;
  declare created_at: Date;
  declare updated_at: Date;
}

MaintenanceCar.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    car: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    date_maintenance: {
      type: sequelize.DATE,
      allowNull: false,
    },
    registration_source: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    approver: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    comments: {
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
    tableName: "maintenance_car",
    timestamps: false,
    underscored: false,
  }
);

export default MaintenanceCar;
