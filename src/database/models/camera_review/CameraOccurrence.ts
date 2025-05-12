import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class CameraOccurrence extends Model {
  declare id: number;
  declare name: string;
  declare f23: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

CameraOccurrence.init(
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
    f23: {
      type: sequelize.BOOLEAN,
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
    tableName: "camera_occurrence",
    timestamps: false,
    underscored: false,
  }
);

export default CameraOccurrence;
