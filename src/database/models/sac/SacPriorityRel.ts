import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Sac from "./Sac";
import Priority from "../shared/Priority";

class SacPriorityRel extends Model {
  declare sac_id: number;
  declare sac_priority_id: number;
}

SacPriorityRel.init(
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
    sac_priority_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "priority",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "sac_priority_rel",
    timestamps: false,
    underscored: false,
  }
);

Sac.belongsToMany(Priority, {
  foreignKey: "sac_id",
  otherKey: "sac_priority_id",
  as: "sac_priority",
  through: SacPriorityRel,
});

Priority.belongsToMany(Sac, {
  foreignKey: "sac_priority_id",
  otherKey: "sac_id",
  as: "sac",
  through: SacPriorityRel,
});

export default SacPriorityRel;
