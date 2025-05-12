import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import CameraReview from "./CameraReview";
import CameraStatus from "./CameraStatus";

class CameraReviewStatus extends Model {
  declare camera_review_id: number;
  declare camera_status_id: number;
}

CameraReviewStatus.init(
  {
    camera_review_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "camera_review",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    camera_status_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "camera_status",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "camera_review_status",
    timestamps: false,
    underscored: false,
  }
);

CameraReview.belongsToMany(CameraStatus, {
  foreignKey: "camera_review_id",
  otherKey: "camera_status_id",
  as: "camera_status",
  through: CameraReviewStatus,
});

CameraStatus.belongsToMany(CameraReview, {
  foreignKey: "camera_status_id",
  otherKey: "camera_review_id",
  as: "reviews",
  through: CameraReviewStatus,
});

export default CameraReviewStatus;
