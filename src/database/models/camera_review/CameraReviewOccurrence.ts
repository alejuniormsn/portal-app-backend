import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "../index";
import CameraReview from "./CameraReview";
import CameraOccurrence from "./CameraOccurrence";

class CameraReviewOccurrence extends Model {
  declare camera_review_id: number;
  declare camera_occurrence_id: number;
}

CameraReviewOccurrence.init(
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
    camera_occurrence_id: {
      primaryKey: true,
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "monitoring_occurrence",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "camera_review_occurrence",
    timestamps: false,
    underscored: false,
  }
);

CameraReview.belongsToMany(CameraOccurrence, {
  foreignKey: "camera_review_id",
  otherKey: "camera_occurrence_id",
  as: "camera_occurrence",
  through: CameraReviewOccurrence,
});

CameraOccurrence.belongsToMany(CameraReview, {
  foreignKey: "camera_occurrence_id",
  otherKey: "camera_review_id",
  as: "reviews",
  through: CameraReviewOccurrence,
});

export default CameraReviewOccurrence;
