import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Ro from "./Ro";
import RoStatus from "./RoStatus";

class RoStatusRel extends Model {
  declare ro_id: number;
  declare ro_status_id: number;
}

RoStatusRel.init(
  {
    ro_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ro",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    ro_status_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ro_status",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "ro_status_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(RoStatus, {
  foreignKey: "ro_id",
  otherKey: "ro_status_id",
  as: "ro_status",
  through: RoStatusRel,
});

RoStatus.belongsToMany(Ro, {
  foreignKey: "ro_status_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoStatusRel,
});

export default RoStatusRel;
