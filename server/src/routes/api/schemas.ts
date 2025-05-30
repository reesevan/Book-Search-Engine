import Joi from 'joi';

export const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().optional(),
  // ... other fields
});
