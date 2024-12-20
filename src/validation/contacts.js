import Joi from 'joi';

import { contactList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  phoneNumber: Joi.string().required().min(3).max(20).messages({
    'any.required': 'number must be exist',
  }),
  contactType: Joi.string()
    .required()
    .valid(...contactList)
    .default('personal')
    .min(3)
    .max(20),
  isFavourite: Joi.boolean(),
  photo: Joi.string().max(200),
  email: Joi.string().max(200),
});

export const contactPatchSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...contactList)
    .default('personal')
    .min(3)
    .max(20),
  photo: Joi.string().max(200),
  email: Joi.string().max(200),
});
