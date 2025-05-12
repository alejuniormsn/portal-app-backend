import joi from "joi";
import { errorMessages } from "./errorMessages";

const schema = {
  monitor_registration: joi
    .number()
    .min(1000)
    .max(9999)
    .required()
    .messages(errorMessages("monitor_registration", 4)),
  ticket_number: joi
    .string()
    .required()
    .messages(errorMessages("ticket_number")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
  date_occurrence: joi
    .date()
    .allow(null)
    .messages(errorMessages("date_occurrence")),
  sac_status: joi.number().required().messages(errorMessages("sac_status")),
  title: joi.string().required().messages(errorMessages("title")),
  history: joi.string().required().messages(errorMessages("history")),
  name_cli: joi.string().required().messages(errorMessages("name_cli")),
  phone: joi.string().allow(null).messages(errorMessages("phone")),
  email: joi.string().email().allow(null).messages(errorMessages("email")),
  rg_cli: joi.string().allow(null).messages(errorMessages("rg_cli")),
  sac_gender: joi.number().required().messages(errorMessages("sac_gender")),
  sac_occurrence_type: joi
    .number()
    .required()
    .messages(errorMessages("sac_occurrence_type")),
  sac_source_channel: joi
    .number()
    .required()
    .messages(errorMessages("sac_source_channel")),
  sac_department: joi
    .number()
    .required()
    .messages(errorMessages("sac_department")),
  sac_priority: joi.number().required().messages(errorMessages("sac_priority")),
  sac_user: joi.number().required().messages(errorMessages("sac_user")),
  sac_group: joi.number().allow(null).messages(errorMessages("sac_group:")),
  car: joi.number().allow(null).messages(errorMessages("car")),
  line_bus: joi.number().allow(null).messages(errorMessages("line_bus")),
};

const sac = joi.object(schema);

const sacUpdate = joi.object({
  ...schema,
  video_path: joi.string().allow(null).messages(errorMessages("video_path")),
  related_ticket_list: joi
    .string()
    .allow(null)
    .messages(errorMessages("related_ticket_list")),
  proceeding: joi.number().required().messages(errorMessages("proceeding")),
  employee_involved: joi
    .number()
    .allow(null)
    .messages(errorMessages("employee_involved")),
  sac_department: joi.number().messages(errorMessages("sac_department")),
  sac_user: joi.number().messages(errorMessages("sac_user")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
});

const schemaTreatment = {
  sac_id: joi.number().required().messages(errorMessages("sac_id")),
  department_id: joi
    .number()
    .required()
    .messages(errorMessages("department_id")),
  department_name: joi
    .string()
    .required()
    .messages(errorMessages("department_name")),
  user_name: joi.string().required().messages(errorMessages("user_name")),
  user_id: joi.number().required().messages(errorMessages("user_id")),
  update_user_name: joi
    .string()
    .allow(null)
    .messages(errorMessages("update_user_name")),
  update_user_id: joi
    .number()
    .allow(null)
    .messages(errorMessages("update_user_id")),
  treatment: joi.string().allow(null).messages(errorMessages("treatment")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
};

const sacTreatment = joi.object(schemaTreatment);

const treatmentUpdate = joi.object({
  ...schemaTreatment,
  id: joi.number().required().messages(errorMessages("id")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
});

const treatmentSacUpdate = joi.object({
  sac_group: joi.number().required().messages(errorMessages("sac_group")),
  sac_priority: joi.number().required().messages(errorMessages("sac_priority")),
  employee_involved: joi
    .number()
    .allow(null)
    .messages(errorMessages("employee_involved")),
  proceeding: joi.number().required().messages(errorMessages("proceeding")),
  video_path: joi.string().allow(null).messages(errorMessages("video_path")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
});

const sacStatusUpdate = joi.object({
  sac_user: joi.number().required().messages(errorMessages("sac_user")),
  sac_status: joi.number().required().messages(errorMessages("sac_status")),
  sac_department: joi
    .number()
    .required()
    .messages(errorMessages("sac_department")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
});

export = {
  sac,
  sacUpdate,
  sacStatusUpdate,
  sacTreatment,
  treatmentUpdate,
  treatmentSacUpdate,
};
