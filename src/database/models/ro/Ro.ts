import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class Ro extends Model {
  declare id: number;
  declare occurrence_number: string;
  declare occurrence_date: Date;
  declare created_at: Date;
  declare updated_at: Date;
  declare date_restore: Date;
  declare monitor_registration: number;
  declare vehicle_kilometer: number;
  declare employee_involved: number;
  declare location: string;
  declare occurrence_detail: string;
  declare direction: number;
  declare sos: number;
  declare collected: number;
  declare substitution: number;
  declare deviation_realized: string;
  declare occurrence_response: string;
  declare observation: string;
  declare departure_canceled_go_1: string;
  declare departure_canceled_go_2: string;
  declare departure_canceled_return_1: string;
  declare departure_canceled_return_2: string;
  declare interrupted_output: string;
  declare substitute_vehicle: number;
}

Ro.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    occurrence_number: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    occurrence_date: {
      type: sequelize.DATE,
      allowNull: false,
    },
    created_at: {
      type: sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: sequelize.DATE,
      allowNull: true,
    },
    date_restore: {
      type: sequelize.DATE,
      allowNull: true,
    },
    monitor_registration: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    vehicle_kilometer: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    employee_involved: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    location: {
      type: sequelize.STRING,
      allowNull: false,
    },
    occurrence_detail: {
      type: sequelize.STRING,
      allowNull: true,
    },
    deviation_realized: {
      type: sequelize.STRING,
      allowNull: true,
    },
    direction: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    sos: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    collected: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    substitution: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    occurrence_response: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    observation: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    departure_canceled_go_1: {
      type: sequelize.STRING,
      allowNull: true,
    },
    departure_canceled_go_2: {
      type: sequelize.STRING,
      allowNull: true,
    },
    departure_canceled_return_1: {
      type: sequelize.STRING,
      allowNull: true,
    },
    departure_canceled_return_2: {
      type: sequelize.STRING,
      allowNull: true,
    },
    interrupted_output: {
      type: sequelize.STRING,
      allowNull: true,
    },
    substitute_vehicle: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "ro",
    timestamps: false,
    underscored: false,
  }
);

export default Ro;
