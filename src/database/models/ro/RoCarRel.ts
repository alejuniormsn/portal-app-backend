import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Ro from "./Ro";
import Vehicle from "../vehicle/Vehicle";

class RoCarRel extends Model {
  declare ro_id: number;
  declare ro_car_id: number;
}

RoCarRel.init(
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
    ro_car_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "vehicle",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "ro_car_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(Vehicle, {
  foreignKey: "ro_id",
  otherKey: "ro_car_id",
  as: "ro_car",
  through: RoCarRel,
});

Vehicle.belongsToMany(Ro, {
  foreignKey: "ro_car_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoCarRel,
});

export default RoCarRel;
