import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class MonitoringOccurrence extends Model {
  declare id: number;
  declare name: string;
  declare created_at: Date;
  declare updated_at: Date;
}

MonitoringOccurrence.init(
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
    tableName: "monitoring_occurrence",
    timestamps: false,
    underscored: false,
  }
);

export default MonitoringOccurrence;
