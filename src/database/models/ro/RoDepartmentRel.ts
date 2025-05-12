import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Department from "../shared/Department";
import Ro from "./Ro";

class RoDepartmentRel extends Model {
  declare ro_id: number;
  declare ro_department_id: number;
}

RoDepartmentRel.init(
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
    ro_department_id: {
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
    tableName: "ro_department_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(Department, {
  foreignKey: "ro_id",
  otherKey: "ro_department_id",
  as: "ro_department",
  through: RoDepartmentRel,
});

Department.belongsToMany(Ro, {
  foreignKey: "ro_department_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoDepartmentRel,
});

export default RoDepartmentRel;
