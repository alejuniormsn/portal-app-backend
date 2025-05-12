import joi from "joi";
import { errorMessages } from "./errorMessages";

const schema = {
  date_maintenance: joi
    .date()
    .required()
    .messages(errorMessages("date_maintenance")),
  registration_source: joi
    .number()
    .min(1000)
    .max(9999)
    .required()
    .messages(errorMessages("registration_source", 4)),
  approver: joi
    .number()
    .min(1000)
    .max(9999)
    .allow(null)
    .messages(errorMessages("approver", 4)),
  car: joi.number().required().messages(errorMessages("car")),
  comments: joi.string().allow(null).messages(errorMessages("comments")),
  types: joi.number().required().messages(errorMessages("types")),
  details: joi.number().required().messages(errorMessages("details")),
  status: joi.number().required().messages(errorMessages("status")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
};

const maintenanceCar = joi.object(schema);

const maintenanceCarUpdate = joi.object({
  ...schema,
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
});

const maintenanceCarStatus = joi.object({
  approver: joi
    .number()
    .min(1000)
    .max(9999)
    .required()
    .messages(errorMessages("approver", 4)),
  status: joi.number().required().messages(errorMessages("status")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
});

const maintenanceOptions = joi.array().items({
  name: joi.string().min(5).required().messages(errorMessages("name", 5)),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
});

const maintenanceOptionsStatus = joi.array().items({
  name: joi.string().min(5).required().messages(errorMessages("name", 5)),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
  cod_department: joi
    .number()
    .required()
    .messages(errorMessages("cod_department")),
});

const changeStatusMaintenanceSupport = joi.object({
  status: joi.number().required().messages(errorMessages("status")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
});

export = {
  maintenanceCar,
  maintenanceCarUpdate,
  maintenanceCarStatus,
  maintenanceOptions,
  maintenanceOptionsStatus,
  changeStatusMaintenanceSupport,
};
