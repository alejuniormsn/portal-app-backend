import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Sac from "./Sac";
import User from "../User/User";

class SacUserRel extends Model {
  declare sac_id: number;
  declare sac_user_id: number;
}

SacUserRel.init(
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
    sac_user_id: {
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
    tableName: "sac_user_rel",
    timestamps: false,
    underscored: false,
  }
);

Sac.belongsToMany(User, {
  foreignKey: "sac_id",
  otherKey: "sac_user_id",
  as: "sac_user",
  through: SacUserRel,
});

User.belongsToMany(Sac, {
  foreignKey: "sac_user_id",
  otherKey: "sac_id",
  as: "sac",
  through: SacUserRel,
});

export default SacUserRel;
