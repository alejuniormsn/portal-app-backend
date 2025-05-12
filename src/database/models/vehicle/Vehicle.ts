import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class Vehicle extends Model {
  declare id: number;
  declare car: number;
  declare disabled: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

Vehicle.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    car: {
      type: sequelize.INTEGER,
      unique: true,
      allowNull: false,
    },
    disabled: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: "vehicle",
    timestamps: false,
    underscored: false,
  }
);

export default Vehicle;
