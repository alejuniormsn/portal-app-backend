import { INTEGER, Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class RoOccurrence extends Model {
  declare id: number;
  declare name: string;
  declare sector_affected: Array<number>;
  declare created_at: Date;
  declare updated_at: Date;
}

RoOccurrence.init(
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
    sector_affected: {
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
    tableName: "ro_occurrence",
    timestamps: false,
    underscored: false,
  }
);
export default RoOccurrence;
