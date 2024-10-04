import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/Contacts.js';

export const getAllContactsController = async (req, res) => {
  const {perPage, page} = parsePaginationParams(req.query);
  const {sortBy, sortOrder} = parseSortParams({...req.query, sortFields});


  const data = await contactServices.getAllContacts({
      perPage,
      page,
      sortBy,
      sortOrder,
  });

  res.json({
      status: 200,
      message: "Successfully found contacts!",
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

export const addContactController = async(req, res)=> {
  const data = await contactServices.createContact(req.body);
  
  res.status(201).json({
    status: 201,
    message: "Contact add successfully",
    data,
  });
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

export const patchContactController = async(req, res) => {
  const {id} = req.params;
  const result = await contactServices.updateContact({_id: id}, req.body);

  if (!result) {
      throw createHttpError(404, "Contact not found");
  }

  res.json({
      status: 200,
      message: "Successfully patched a contact!",
      data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.deleteContact({ _id: id });

  if (!data) {
      throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send(); 
};

