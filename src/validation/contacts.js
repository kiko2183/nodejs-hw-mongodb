import Joi from "joi";

import { contactList } from "../constants/contacts.js";


export const contactAddSchema = Joi.object({
	name: Joi.string().required().min(3).max(20),
	phoneNumber: Joi.string().required().min(3).max(20),
	email: Joi.string().min(3).max(20),
	isFavourite: Joi.boolean(),
	contactType: Joi.string().required().valid(...contactList).default('personal').min(3).max(20)
});

export const contactPatchSchema = Joi.object({
	name: Joi.string().min(3).max(20),
	phoneNumber: Joi.string().min(3).max(20),
	email: Joi.string().min(3).max(20),
	isFavourite: Joi.boolean(),
	contactType: Joi.string().valid(...contactList).default('personal').min(3).max(20)
});