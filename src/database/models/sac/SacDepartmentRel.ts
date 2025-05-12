import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Sac from "./Sac";
import Department from "../shared/Department";

class SacDepartmentRel extends Model {
  declare sac_id: number;
  declare sac_department_id: number;
}

SacDepartmentRel.init(
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
    sac_department_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "department",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "sac_department_rel",
    timestamps: false,
    underscored: false,
  }
);

Sac.belongsToMany(Department, {
  foreignKey: "sac_id",
  otherKey: "sac_department_id",
  as: "sac_department",
  through: SacDepartmentRel,
});

Department.belongsToMany(Sac, {
  foreignKey: "sac_department_id",
  otherKey: "sac_id",
  as: "sac",
  through: SacDepartmentRel,
});

export default SacDepartmentRel;
