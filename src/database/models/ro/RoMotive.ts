import { INTEGER, Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class RoMotive extends Model {
  declare id: number;
  declare name: string;
  declare occurrence_type: Array<number>;
  declare created_at: Date;
  declare updated_at: Date;
}

RoMotive.init(
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
    occurrence_type: {
      type: sequelize.ARRAY(INTEGER),
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
    tableName: "ro_motive",
    timestamps: false,
    underscored: false,
  }
);
export default RoMotive;
