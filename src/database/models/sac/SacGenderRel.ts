import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Sac from "./Sac";
import Gender from "../User/Gender";

class SacGenderRel extends Model {
  declare sac_id: number;
  declare sac_gender_id: number;
}

SacGenderRel.init(
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
    sac_gender_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "gender",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "sac_gender_rel",
    timestamps: false,
    underscored: false,
  }
);

Sac.belongsToMany(Gender, {
  foreignKey: "sac_id",
  otherKey: "sac_gender_id",
  as: "sac_gender",
  through: SacGenderRel,
});

Gender.belongsToMany(Sac, {
  foreignKey: "sac_gender_id",
  otherKey: "sac_id",
  as: "sac",
  through: SacGenderRel,
});

export default SacGenderRel;
