import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Ro from "./Ro";
import RoOccurrence from "./RoOccurrence";

class RoOccurrenceRel extends Model {
  declare ro_id: number;
  declare ro_occurrence_id: number;
}

RoOccurrenceRel.init(
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
    ro_occurrence_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ro_occurrence",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "ro_occurrence_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(RoOccurrence, {
  foreignKey: "ro_id",
  otherKey: "ro_occurrence_id",
  as: "ro_occurrence",
  through: RoOccurrenceRel,
});

RoOccurrence.belongsToMany(Ro, {
  foreignKey: "ro_occurrence_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoOccurrenceRel,
});

export default RoOccurrenceRel;
