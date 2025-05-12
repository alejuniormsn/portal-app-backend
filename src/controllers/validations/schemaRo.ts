import joi, { allow } from "joi";
import { errorMessages } from "./errorMessages";

const schema = {
  monitor_registration: joi
    .number()
    .min(1000)
    .max(9999)
    .required()
    .messages(errorMessages("monitor_registration", 4)),
  observation: joi.string().allow(null).messages(errorMessages("observation")),
  occurrence_response: joi
    .string()
    .required()
    .allow(null)
    .messages(errorMessages("occurrence_response")),
  substitution: joi
    .number()
    .required()
    .allow(null)
    .messages(errorMessages("substitution")),
  collected: joi
    .number()
    .required()
    .allow(null)
    .messages(errorMessages("collected")),
  direction: joi.number().required().messages(errorMessages("direction")),
  sos: joi.number().required().allow(null).messages(errorMessages("sos")),
  occurrence_detail: joi
    .string()
    .min(5)
    .required()
    .allow(null)
    .messages(errorMessages("occurrence_detail", 5)),
  ro_occurrence: joi
    .number()
    .required()
    .messages(errorMessages("ro_occurrence")),
  ro_sector: joi.number().required().messages(errorMessages("ro_sector")),
  ro_city: joi.number().required().messages(errorMessages("ro_city")),
  ro_bus_line: joi.number().required().messages(errorMessages("ro_bus_line")),
  ro_car: joi.number().required().allow(null).messages(errorMessages("ro_car")),
  location: joi
    .string()
    .min(5)
    .required()
    .messages(errorMessages("location", 5)),
  deviation_realized: joi
    .string()
    .required()
    .allow(null)
    .messages(errorMessages("deviation_realized")),
  employee_involved: joi
    .number()
    .min(100)
    .max(9999)
    .required()
    .allow(null)
    .messages(errorMessages("employee_involved", 4)),
  vehicle_kilometer: joi
    .number()
    .required()
    .allow(null)
    .messages(errorMessages("vehicle_kilometer")),
  ro_occurrence_type: joi
    .number()
    .required()
    .messages(errorMessages("ro_occurrence_type")),
  ro_status: joi.number().required().messages(errorMessages("ro_status")),
  occurrence_number: joi
    .string()
    .required()
    .messages(errorMessages("occurrence_number")),
  ro_user: joi.number().required().messages(errorMessages("ro_user")),
  ro_department: joi
    .number()
    .required()
    .messages(errorMessages("ro_department")),
  ro_motive: joi
    .number()
    .required()
    .allow(null)
    .messages(errorMessages("ro_motive")),
  date_restore: joi
    .date()
    .required()
    .allow(null)
    .messages(errorMessages("date_restore")),
  interrupted_output: joi
    .string()
    .required()
    .allow(null)
    .messages(errorMessages("interrupted_output")),
  departure_canceled_go_1: joi
    .string()
    .required()
    .allow(null)
    .messages(errorMessages("departure_canceled_go_1")),
  departure_canceled_go_2: joi
    .string()
    .required()
    .allow(null)
    .messages(errorMessages("departure_canceled_go_2")),
  departure_canceled_return_1: joi
    .string()
    .required()
    .allow(null)
    .messages(errorMessages("departure_canceled_return_1")),
  departure_canceled_return_2: joi
    .string()
    .required()
    .allow(null)
    .messages(errorMessages("departure_canceled_return_2")),
  substitute_vehicle: joi
    .number()
    .required()
    .allow(null)
    .messages(errorMessages("substitute_vehicle")),
  occurrence_date: joi
    .date()
    .required()
    .messages(errorMessages("occurrence_date")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
  activeUserId: joi
    .number()
    .required()
    .allow(null)
    .messages(errorMessages("activeUserId")),
  activeUser: joi
    .string()
    .required()
    .allow(null)
    .messages(errorMessages("activeUser")),
};

const roCreate = joi.object(schema);

const roUpdate = joi.object({
  ...schema,
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
});

const roUpdateChangeOccurrenceType = joi.object({
  occurrenceTypeId: joi
    .number()
    .required()
    .messages(errorMessages("occurrenceTypeId")),
  occurrenceType: joi
    .string()
    .required()
    .messages(errorMessages("occurrenceType")),
  oldOccurrenceType: joi
    .string()
    .required()
    .messages(errorMessages("oldOccurrenceType")),
  activeUserId: joi.number().required().messages(errorMessages("activeUserId")),
  activeUser: joi.string().required().messages(errorMessages("activeUser")),
});

const updateStatusRo = joi.object({
  ro_status: joi.number().required().messages(errorMessages("ro_status")),
  activeUserId: joi.number().required().messages(errorMessages("activeUserId")),
  activeUser: joi.string().required().messages(errorMessages("activeUser")),
});

const roSelect = joi.array().items({
  name: joi.string().min(5).required().messages(errorMessages("name", 5)),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
});

const roMotive = joi.array().items({
  name: joi.string().min(5).required().messages(errorMessages("name", 5)),
  occurrence_type: joi
    .array<number>()
    .required()
    .messages(errorMessages("occurrence_type")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
});

const roOccurrence = joi.array().items({
  name: joi.string().min(5).required().messages(errorMessages("name", 5)),
  sector_affected: joi
    .array<number>()
    .required()
    .messages(errorMessages("sector_affected")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
});

const roUpdateAssignTo = joi.object({
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
  ro_user: joi.number().required().messages(errorMessages("ro_user")),
  ro_department: joi
    .number()
    .required()
    .messages(errorMessages("ro_department")),
  occurrence_response: joi
    .string()
    .required()
    .allow(null)
    .messages(errorMessages("occurrence_response")),
  username_old: joi.string().required().messages(errorMessages("username_old")),
  username: joi.string().required().messages(errorMessages("username")),
  activeUserId: joi.number().required().messages(errorMessages("activeUserId")),
  activeUser: joi.string().required().messages(errorMessages("activeUser")),
});

const changeStatusRoSupport = joi.object({
  ro_status: joi.number().required().messages(errorMessages("ro_status")),
  ro_department: joi
    .number()
    .required()
    .messages(errorMessages("ro_department")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
});

export = {
  roCreate,
  roUpdateAssignTo,
  roUpdate,
  roSelect,
  roMotive,
  roOccurrence,
  roUpdateChangeOccurrenceType,
  updateStatusRo,
  changeStatusRoSupport,
};
