import { Joi } from "celebrate";

// user's registration validation schema
const addProductSchema = {
  body: {
    title: Joi.string().trim().required(),
    images: Joi.array().items({
      url: Joi.array().required(),
      color: Joi.string().required(),
    }),
    sizes: Joi.array().items({
      size: Joi.string().required(),
      price: Joi.number().required(),
    }),
    description: Joi.string().trim()
  },
};

export default { addProductSchema };
