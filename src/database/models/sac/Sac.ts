import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class Sac extends Model {
  declare id: number;
  declare ticket_number: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare date_occurrence: Date;
  declare monitor_registration: number;
  declare name_cli: string;
  declare title: string;
  declare history: string;
  declare phone: string;
  declare rg_cli: string;
  declare email: string;
  declare employee_involved: number;
  declare proceeding: number;
  declare sac_group: number;
  declare car: number;
  declare video_path: string;
  declare related_ticket_list: string;
}

Sac.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ticket_number: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    monitor_registration: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    name_cli: {
      type: sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: sequelize.STRING,
      allowNull: false,
    },
    history: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    phone: {
      type: sequelize.STRING,
      allowNull: true,
    },
    rg_cli: {
      type: sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: sequelize.STRING,
      allowNull: true,
    },
    employee_involved: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    proceeding: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    video_path: {
      type: sequelize.STRING,
      allowNull: true,
    },
    related_ticket_list: {
      type: sequelize.STRING,
      allowNull: true,
    },
    sac_group: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    car: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    line_bus: {
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
    date_occurrence: {
      type: sequelize.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "sac",
    timestamps: false,
    underscored: false,
  }
);

export default Sac;
