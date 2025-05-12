import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class BusLine extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare created_at: Date;
  declare updated_at: Date;
}

BusLine.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: sequelize.STRING,
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
  },
  {
    sequelize: db,
    tableName: "bus_line",
    timestamps: false,
    underscored: false,
  }
);
export default BusLine;
