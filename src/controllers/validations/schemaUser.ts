import joi from "joi";
import { errorMessages } from "./errorMessages";

const login = joi.object({
  registration: joi
    .number()
    .min(1000)
    .max(9999)
    .required()
    .messages(errorMessages("registration", 4)),
  password: joi
    .string()
    .min(6)
    .required()
    .messages(errorMessages("password", 6)),
});

const schema = {
  registration: joi
    .number()
    .min(1000)
    .max(9999)
    .required()
    .messages(errorMessages("registration", 4)),
  password: joi
    .string()
    .min(6)
    .required()
    .messages(errorMessages("password", 6)),
  cpf: joi.string().min(10).required().messages(errorMessages("cpf", 10)),
  name: joi.string().min(4).required().messages(errorMessages("name", 4)),
  mother_name: joi
    .string()
    .min(4)
    .required()
    .messages(errorMessages("mother_name", 4)),
  email: joi.string().required().messages(errorMessages("email")),
  occurrence: joi.string().allow(null).messages(errorMessages("occurrence")),
  phone: joi.string().min(11).required().messages(errorMessages("phone", 11)),
  access_group: joi
    .number()
    .required()
    .min(1)
    .messages(errorMessages("access_group", 1)),
  last_modified_by: joi
    .number()
    .allow(null)
    .messages(errorMessages("last_modified_by")),
  department: joi
    .array()
    .items(joi.number().required())
    .messages(errorMessages("department")),
  access_level: joi
    .array()
    .items(
      joi.object({
        dpto: joi.number().required().messages(errorMessages("dpto")),
        level: joi.number().required().messages(errorMessages("level")),
      })
    )
    .messages(errorMessages("access_level")),
  name_main_department: joi
    .string()
    .allow(null)
    .messages(errorMessages("name_main_department")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
};

const user = joi.object(schema);

const updateUser = joi.object({
  ...schema,
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: [
          "br",
          "com",
          "net",
          "org",
          "gov",
          "art",
          "site",
          "store",
          "online",
        ],
      },
    })
    .allow(null)
    .messages(errorMessages("email")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
});

const updatePassword = joi.object({
  password: joi
    .string()
    .min(6)
    .required()
    .messages(errorMessages("password", 6)),
  occurrence: joi.string().allow(null).messages(errorMessages("occurrence")),
  last_modified_by: joi
    .number()
    .allow(null)
    .messages(errorMessages("last_modified_by")),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: [
          "br",
          "com",
          "net",
          "org",
          "gov",
          "art",
          "site",
          "store",
          "online",
        ],
      },
    })
    .allow(null)
    .messages(errorMessages("email")),
  phone: joi.string().min(11).required().messages(errorMessages("phone", 11)),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
});

const chapafunc = joi.object({
  chapafunc: joi
    .string()
    .min(4)
    .required()
    .messages(errorMessages("chapafunc", 4)),
});

// ------- AccessGroup ---------
const schemaAccessGroup = {
  access_group: joi.number().required().messages(errorMessages("access_group")),
  group_name: joi.string().required().messages(errorMessages("group_name")),
  group: joi
    .array()
    .items(
      joi.object({
        department_id: joi
          .number()
          .required()
          .messages(errorMessages("department_id")),
        icon: joi.string().required().messages(errorMessages("icon")),
        path: joi.string().allow(null).messages(errorMessages("path")),
        label: joi.string().required().messages(errorMessages("label")),
        subItems: joi.array().items(
          joi.object({
            to: joi.string().required().messages(errorMessages("to")),
            icon: joi.string().required().messages(errorMessages("icon")),
            label: joi.string().required().messages(errorMessages("label")),
          })
        ),
      })
    )
    .allow(null)
    .messages(errorMessages("group")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
};

const group = joi.object(schemaAccessGroup);

const updateGroup = joi.object({
  ...schemaAccessGroup,
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
});

// ------- Department ---------
const baseDepartmentSchema = {
  name: joi.string().required().messages(errorMessages("name")),
  access: joi
    .object({
      icon: joi.string().required().messages(errorMessages("icon")),
      path: joi.string().allow(null).messages(errorMessages("path")),
      label: joi.string().required().messages(errorMessages("label")),
      subItems: joi
        .array()
        .allow(null)
        .items(
          joi.object({
            to: joi.string().required().messages(errorMessages("to")),
            icon: joi.string().required().messages(errorMessages("icon")),
            label: joi.string().required().messages(errorMessages("label")),
          })
        ),
    })
    .messages(errorMessages("access")),
  created_at: joi.date().required().messages(errorMessages("created_at")),
  updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
};

const department = joi.object(baseDepartmentSchema);

const updateDepartment = joi.object({
  ...baseDepartmentSchema,
  created_at: joi.date().allow(null).messages(errorMessages("created_at")),
  updated_at: joi.date().required().messages(errorMessages("updated_at")),
});

export = {
  user,
  login,
  updatePassword,
  group,
  updateGroup,
  department,
  updateUser,
  chapafunc,
  updateDepartment,
};
