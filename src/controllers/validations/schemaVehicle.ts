import joi from "joi";
import { errorMessages } from "./errorMessages";

const vehicle = joi.array().items(
  joi.object({
    car: joi.number().required().messages(errorMessages("car")),
    disabled: joi.boolean().messages(errorMessages("disabled")),
    created_at: joi.date().required().messages(errorMessages("created_at")),
    updated_at: joi.date().allow(null).messages(errorMessages("updated_at")),
  })
);

const vehicleUpdate = joi.array().items(
  joi.object({
    car: joi.number().required().messages(errorMessages("car")),
    disabled: joi.boolean().messages(errorMessages("disabled")),
    updated_at: joi.date().required().messages(errorMessages("updated_at")),
    created_at: joi.date().allow(null).messages(errorMessages("created_at")),
  })
);

export = {
  vehicle,
  vehicleUpdate,
};
