import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Ro from "./Ro";
import City from "../shared/City";

class RoCitiesRel extends Model {
  declare ro_id: number;
  declare ro_city_id: number;
}

RoCitiesRel.init(
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
    ro_city_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "cities",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "ro_cities_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(City, {
  foreignKey: "ro_id",
  otherKey: "ro_city_id",
  as: "ro_city",
  through: RoCitiesRel,
});

City.belongsToMany(Ro, {
  foreignKey: "ro_city_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoCitiesRel,
});

export default RoCitiesRel;
