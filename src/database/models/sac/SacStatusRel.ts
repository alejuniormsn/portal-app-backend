import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Sac from "./Sac";
import SacStatus from "./SacStatus";

class SacStatusRel extends Model {
  declare sac_id: number;
  declare sac_status_id: number;
}

SacStatusRel.init(
  {
    sac_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "sac",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    sac_status_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "sac_status",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "sac_status_rel",
    timestamps: false,
    underscored: false,
  }
);

Sac.belongsToMany(SacStatus, {
  foreignKey: "sac_id",
  otherKey: "sac_status_id",
  as: "sac_status",
  through: SacStatusRel,
});

SacStatus.belongsToMany(Sac, {
  foreignKey: "sac_status_id",
  otherKey: "sac_id",
  as: "sac",
  through: SacStatusRel,
});

export default SacStatusRel;
