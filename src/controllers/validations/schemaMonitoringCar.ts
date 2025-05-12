import joi from "joi";
import { errorMessages } from "./errorMessages";

const schema = {
  monitor_registration: joi
    .number()
    .min(1000)
    .max(9999)
    .required()
    .messages(errorMessages("monitor_registration", 4)),
  date_check: joi.date().required().messages(errorMessages("date_check")),
  car: joi.number().required().messages(errorMessages("car")),
  driver_registration: joi
    .number()
    .min(100)
    .max(9999)
    .required()
    .messages(errorMessages("driver_registration", 4)),
  date_occurrence: joi
    .date()
    .required()
    .messages(errorMessages("date_occurrence")),
  type_occurrence: joi
    .number()
    .required()
    .messages(errorMessages("type_occurrence")),
  occurrence: joi.number().required().messages(errorMessages("occurrence")),
  ra_globus: joi.string().allow(null).messages(errorMessages("ra_globus")),
  monitoring_status: joi
    .number()
    .required()
    .messages(errorMessages("monitoring_status")),
  video_path: joi.string().allow(null).messages(errorMessages("video_path")),
  comment: joi.string().allow(null).messages(errorMessages("comment")),
  treatment: joi.string().allow(null).messages(errorMessages("treatment")),
  date_inspector: joi
    .date()
    .allow(null)
    .messages(errorMessages("date_inspector")),
  inspector_registration: joi
    .number()
    .min(1000)
    .max(9999)
    .allow(null)
    .messages(errorMessages("inspector_registration", 4)),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
};

const monitoringCar = joi.object(schema);

const monitoringCarUpdate = joi.object({
  ...schema,
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
});

const monitoringCarStatus = joi.object({
  monitoring_status: joi
    .number()
    .required()
    .messages(errorMessages("monitoring_status")),
  date_inspector: joi
    .date()
    .required()
    .messages(errorMessages("date_inspector")),
  inspector_registration: joi
    .number()
    .min(1000)
    .max(9999)
    .required()
    .messages(errorMessages("inspector_registration", 4)),
  treatment: joi.string().required().messages(errorMessages("treatment")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
});

const driverScale = joi.object({
  dtsaida: joi.date().required().messages(errorMessages("dt saída")),
  prefixoveic: joi
    .string()
    .required()
    .messages(errorMessages("prefixo veículo")),
});

const monitoringOptions = joi.array().items({
  name: joi.string().min(5).required().messages(errorMessages("name", 5)),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
});

const monitoringOptionsStatus = joi.array().items({
  cod_department: joi
    .number()
    .required()
    .messages(errorMessages("cod_department")),
  name: joi.string().min(5).required().messages(errorMessages("name")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
});

const changeStatusMonitoringSupport = joi.object({
  monitoring_status: joi
    .number()
    .required()
    .messages(errorMessages("monitoring_status")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
});

export = {
  monitoringCar,
  monitoringCarUpdate,
  monitoringCarStatus,
  monitoringOptions,
  monitoringOptionsStatus,
  driverScale,
  changeStatusMonitoringSupport,
};
