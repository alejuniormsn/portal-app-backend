import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class RoAuditLog extends Model {
  declare id: number;
  declare action: string;
  declare user_id: number;
  declare user_name: string;
  declare ro_id: number;
  declare created_at: Date;
}

RoAuditLog.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    action: {
      type: sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    user_name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    ro_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: sequelize.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "ro_audit_log",
    timestamps: false,
    underscored: false,
  }
);
export default RoAuditLog;
