import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Sac from "./Sac";
import SacSourceChannel from "./SacSourceChannel";

class SacSourceChannelRel extends Model {
  declare sac_id: number;
  declare sac_source_channel_id: number;
}

SacSourceChannelRel.init(
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
    sac_source_channel_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "sac_source_channel",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "sac_source_channel_rel",
    timestamps: false,
    underscored: false,
  }
);

Sac.belongsToMany(SacSourceChannel, {
  foreignKey: "sac_id",
  otherKey: "sac_source_channel_id",
  as: "sac_source_channel",
  through: SacSourceChannelRel,
});

SacSourceChannel.belongsToMany(Sac, {
  foreignKey: "sac_source_channel_id",
  otherKey: "sac_id",
  as: "sac",
  through: SacSourceChannelRel,
});

export default SacSourceChannelRel;
