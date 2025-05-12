import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Ro from "./Ro";
import RoMotive from "./RoMotive";

class RoMotiveRel extends Model {
  declare ro_id: number;
  declare ro_motive_id: number;
}

RoMotiveRel.init(
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
    ro_motive_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ro_motive",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "ro_motive_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(RoMotive, {
  foreignKey: "ro_id",
  otherKey: "ro_motive_id",
  as: "ro_motive",
  through: RoMotiveRel,
});

RoMotive.belongsToMany(Ro, {
  foreignKey: "ro_motive_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoMotiveRel,
});

export default RoMotiveRel;
