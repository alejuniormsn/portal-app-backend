import { INTEGER, JSON, Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class User extends Model {
  declare id: number;
  declare registration: number;
  declare cpf: string;
  declare name: string;
  declare email: string;
  declare motherName: string;
  declare occurrence: string;
  declare phone: string;
  declare password: string;
  declare access_group: number;
  declare last_modified_by: number;
  declare department: Array<number>;
  declare name_main_department: string;
  declare access_level: Array<JSON>;
  declare created_at: Date;
  declare updated_at: Date;
}

User.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    registration: {
      type: sequelize.INTEGER,
      unique: true,
      allowNull: false,
    },
    cpf: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: true,
    },
    mother_name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    occurrence: {
      type: sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    access_group: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    department: {
      type: sequelize.ARRAY(INTEGER),
      allowNull: false,
    },
    name_main_department: {
      type: sequelize.STRING,
      allowNull: true,
    },
    access_level: {
      type: sequelize.ARRAY(JSON),
      allowNull: false,
    },
    last_modified_by: {
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
    tableName: "user",
    timestamps: false,
    underscored: false,
  }
);

export default User;
