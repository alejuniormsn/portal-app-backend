import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Ro from "./Ro";
import RoSector from "./RoSector";

class RoSectorRel extends Model {
  declare ro_id: number;
  declare ro_sector_id: number;
}

RoSectorRel.init(
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
    ro_sector_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ro_sector",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "ro_sector_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(RoSector, {
  foreignKey: "ro_id",
  otherKey: "ro_sector_id",
  as: "ro_sector",
  through: RoSectorRel,
});

RoSector.belongsToMany(Ro, {
  foreignKey: "ro_sector_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoSectorRel,
});

export default RoSectorRel;
