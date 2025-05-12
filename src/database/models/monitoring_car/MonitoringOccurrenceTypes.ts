import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class MonitoringOccurrenceTypes extends Model {
  declare id: number;
  declare name: string;
  declare created_at: Date;
  declare updated_at: Date;
}

MonitoringOccurrenceTypes.init(
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
    tableName: "monitoring_occurrence_type",
    timestamps: false,
    underscored: false,
  }
);

export default MonitoringOccurrenceTypes;
