import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class MonitoringStatus extends Model {
  declare id: number;
  declare name: string;
  declare cod_department: number;
  declare created_at: Date;
  declare updated_at: Date;
}

MonitoringStatus.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    cod_department: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: sequelize.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "monitoring_status",
    timestamps: false,
    underscored: false,
  }
);

export default MonitoringStatus;
