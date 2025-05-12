import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Ro from "./Ro";
import User from "../User/User";

class RoUserRel extends Model {
  declare ro_id: number;
  declare ro_user_id: number;
}

RoUserRel.init(
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
    ro_user_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "ro_user_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(User, {
  foreignKey: "ro_id",
  otherKey: "ro_user_id",
  as: "ro_user",
  through: RoUserRel,
});

User.belongsToMany(Ro, {
  foreignKey: "ro_user_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoUserRel,
});

export default RoUserRel;
