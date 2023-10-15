import { Joi } from "celebrate";

// user's registration validation schema
const registrationSchema = {
  body: {
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      .regex(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
      .required()
      .messages({ "string.pattern.base": "Mobile is required" }),
  },
};

// user's login validation schema
const loginSchema = {
  body: {
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  },
};
export default { registrationSchema, loginSchema };
