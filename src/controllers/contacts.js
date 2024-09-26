import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const data = await contactServices.getAllContacts();
  res.json({
      status: 200,
      message: 'Successfully found contacts',
      data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  
  const data = await contactServices.getContactById(id);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Contact with id=${id} successfully found`,
    data,
  });
};

export const addContactController = async (req, res) => {
  try {
    const data = await contactServices.createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Contact added successfully',
      data,
    });
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  try {
    const { isNew, data } = await contactServices.updateContact({ _id: id }, req.body, { upsert: true });
    const status = isNew ? 201 : 200;

    res.status(status).json({
      status,
      message: 'Contact upserted successfully',
      data,
    });
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await contactServices.updateContact({ _id: id }, req.body);

    if (!result) {
      throw createHttpError(404, `Contact with id=${id} not found`);
    }

    res.json({
      status: 200,
      message: 'Contact patched successfully',
      data: result.data,
    });
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.deleteContact({ _id: id });

  if (!data) {
      throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send(); 
};
