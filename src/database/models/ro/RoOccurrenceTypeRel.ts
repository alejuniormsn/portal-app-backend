import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Ro from "./Ro";
import RoOccurrenceType from "./RoOccurrenceType";

class RoOccurrenceTypeRel extends Model {
  declare ro_id: number;
  declare ro_occurrence_type_id: number;
}

RoOccurrenceTypeRel.init(
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
    ro_occurrence_type_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ro_occurrence_type",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "ro_occurrence_type_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(RoOccurrenceType, {
  foreignKey: "ro_id",
  otherKey: "ro_occurrence_type_id",
  as: "ro_occurrence_type",
  through: RoOccurrenceTypeRel,
});

RoOccurrenceType.belongsToMany(Ro, {
  foreignKey: "ro_occurrence_type_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoOccurrenceTypeRel,
});

export default RoOccurrenceTypeRel;
