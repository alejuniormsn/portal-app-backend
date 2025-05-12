import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class City extends Model {
  declare id: number;
  declare name: number;
  declare created_at: Date;
  declare updated_at: Date;
}

City.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.INTEGER,
      unique: true,
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
    tableName: "cities",
    timestamps: false,
    underscored: false,
  }
);

export default City;
