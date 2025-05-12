import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class Department extends Model {
  declare id: number;
  declare name: string;
  declare access: JSON;
  declare created_at: Date;
  declare updated_at: Date;
}

Department.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    access: {
      type: sequelize.JSON,
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
    tableName: "department",
    timestamps: false,
    underscored: false,
  }
);

export default Department;
