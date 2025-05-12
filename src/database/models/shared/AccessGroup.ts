import { JSON, Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class AccessGroup extends Model {
  declare id: number;
  declare access_group: number;
  declare group: Array<JSON>;
  declare group_name: string;
  declare created_at: Date;
  declare updated_at: Date;
}

AccessGroup.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    access_group: {
      type: sequelize.INTEGER,
      unique: true,
      allowNull: false,
    },
    group: {
      type: sequelize.ARRAY(JSON),
      allowNull: false,
    },
    group_name: {
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
    tableName: "access_group",
    timestamps: false,
    underscored: false,
  }
);

export default AccessGroup;
