import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class SacTreatment extends Model {
  declare id: number;
  declare sac_id: number;
  declare department_id: number;
  declare department_name: string;
  declare treatment: string;
  declare user_name: string;
  declare user_id: number;
  declare update_user_name: string;
  declare update_user_id: number;
  declare created_at: Date;
  declare updated_at: Date;
}

SacTreatment.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    sac_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    department_name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    department_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    treatment: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    user_name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    update_user_name: {
      type: sequelize.STRING,
      allowNull: true,
    },
    update_user_id: {
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
    tableName: "sac_treatment",
    timestamps: false,
    underscored: false,
  }
);
export default SacTreatment;
