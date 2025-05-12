import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Ro from "./Ro";
import BusLine from "../vehicle/BusLine";

class RoBusLineRel extends Model {
  declare ro_id: number;
  declare ro_bus_line_id: number;
}

RoBusLineRel.init(
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
    ro_bus_line_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "bus_line",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "ro_bus_line_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(BusLine, {
  foreignKey: "ro_id",
  otherKey: "ro_bus_line_id",
  as: "ro_bus_line",
  through: RoBusLineRel,
});

BusLine.belongsToMany(Ro, {
  foreignKey: "ro_bus_line_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoBusLineRel,
});

export default RoBusLineRel;
