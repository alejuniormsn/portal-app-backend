import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import Ro from "./Ro";
import RoAuditLog from "./RoAuditLog";

class RoAuditLogRel extends Model {
  declare ro_id: number;
  declare ro_audit_id: number;
}

RoAuditLogRel.init(
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
    ro_audit_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ro_audit_log",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "ro_audit_log_rel",
    timestamps: false,
    underscored: false,
  }
);

Ro.belongsToMany(RoAuditLog, {
  foreignKey: "ro_id",
  otherKey: "ro_audit_id",
  as: "ro_audit_log",
  through: RoAuditLogRel,
});

RoAuditLog.belongsToMany(Ro, {
  foreignKey: "ro_audit_id",
  otherKey: "ro_id",
  as: "ro",
  through: RoAuditLogRel,
});

export default RoAuditLogRel;
