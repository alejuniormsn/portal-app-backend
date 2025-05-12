import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Sac from "./Sac";
import SacOccurrenceType from "./SacOccurrenceType";

class SacOccurrenceTypeRel extends Model {
  declare sac_id: number;
  declare sac_occurrence_type_id: number;
}

SacOccurrenceTypeRel.init(
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
    sac_occurrence_type_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "sac_occurrence_type",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "sac_occurrence_type_rel",
    timestamps: false,
    underscored: false,
  }
);

Sac.belongsToMany(SacOccurrenceType, {
  foreignKey: "sac_id",
  otherKey: "sac_occurrence_type_id",
  as: "sac_occurrence_type",
  through: SacOccurrenceTypeRel,
});

SacOccurrenceType.belongsToMany(Sac, {
  foreignKey: "sac_occurrence_type_id",
  otherKey: "sac_id",
  as: "sac",
  through: SacOccurrenceTypeRel,
});

export default SacOccurrenceTypeRel;
