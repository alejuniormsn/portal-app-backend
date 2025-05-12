import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";

class MaintenanceDetail extends Model {
  declare id: number;
  declare name: string;
  declare created_at: Date;
  declare updated_at: Date;
}

MaintenanceDetail.init(
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
    tableName: "maintenance_detail",
    timestamps: false,
    underscored: false,
  }
);

export default MaintenanceDetail;
