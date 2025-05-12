import joi from "joi";
import { errorMessages } from "./errorMessages";

const schema = {
  monitor_registration: joi
    .number()
    .min(1000)
    .max(9999)
    .required()
    .messages(errorMessages("monitor_registration", 4)),
  driver_registration: joi
    .number()
    .min(100)
    .max(9999)
    .allow(null)
    .messages(errorMessages("driver_registration", 4)),
  date_occurrence: joi
    .date()
    .required()
    .messages(errorMessages("date_occurrence")),
  camera_occurrence: joi
    .number()
    .required()
    .messages(errorMessages("camera_occurrence")),
  car: joi.number().required().messages(errorMessages("car")),
  date_camera: joi.date().required().messages(errorMessages("date_camera")),
  reviewed_by: joi.string().allow(null).messages(errorMessages("reviewed_by")),
  there_video: joi.number().allow(null).messages(errorMessages("there_video")),
  video_path: joi.string().allow(null).messages(errorMessages("video_path")),
  date_review: joi.date().allow(null).messages(errorMessages("date_review")),
  comment: joi
    .string()
    .required()
    .min(10)
    .messages(errorMessages("comment", 10)),
  ra_globus: joi.string().allow(null).messages(errorMessages("ra_globus")),
  camera_status: joi
    .number()
    .required()
    .messages(errorMessages("camera_status")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
};

const cameraReview = joi.object(schema);

const cameraReviewUpdate = joi.object({
  ...schema,
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
});

const cameraReviewStatus = joi.object({
  camera_status: joi
    .number()
    .required()
    .messages(errorMessages("camera_status")),
  comment: joi
    .string()
    .required()
    .min(10)
    .messages(errorMessages("comment", 10)),
  reviewed_by: joi.string().allow(null).messages(errorMessages("reviewed_by")),
  date_review: joi.date().allow(null).messages(errorMessages("date_review")),
  video_path: joi.string().allow(null).messages(errorMessages("video_path")),
  there_video: joi.number().required().messages(errorMessages("there_video")),
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
});

const cameraReviewOptions = joi.array().items({
  name: joi.string().min(5).required().messages(errorMessages("name", 5)),
  f23: joi.boolean().required().messages(errorMessages("f23")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
});

const cameraReviewOptionsStatus = joi.array().items({
  cod_department: joi
    .number()
    .required()
    .messages(errorMessages("cod_department")),
  name: joi.string().min(5).required().messages(errorMessages("name", 5)),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
});

const changeStatusCameraReviewSupport = joi.object({
  camera_status: joi
    .number()
    .required()
    .messages(errorMessages("camera_status")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
});

export = {
  cameraReview,
  cameraReviewStatus,
  cameraReviewOptions,
  cameraReviewOptionsStatus,
  cameraReviewUpdate,
  changeStatusCameraReviewSupport,
};
