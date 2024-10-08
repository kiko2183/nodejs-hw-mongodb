import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import * as contactServices from '../services/contacts.js';
import { parseContactsFilterParams } from '../utils/filters/parseContactsFilterParams.js';
import { sortFields } from '../db/Contacts.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { perPage, page } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
    const filter = parseContactsFilterParams(req.query);
    const { _id: userId } = req.user;

    const data = await contactServices.getContacts({
      perPage,
      page,
      sortBy,
      sortOrder,
      filter: { ...filter, userId },
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const data = await contactServices.getContact({ _id: id, userId });

    if (!data) {
      throw createHttpError(404, `Contact with id=${id} not found`);
    }

    res.json({
      status: 200,
      message: `Contact with ${id} successfully found`,
      data,
    });
  } catch (error) {
    next(error); 
  }
};

export const addContactController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const data = await contactServices.createContact({ ...req.body, userId });

    res.status(201).json({
      status: 201,
      message: 'Contact added successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const upsertContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const { isNew, data } = await contactServices.updateContact(
      { _id: id, userId },
      req.body,
      { upsert: true }
    );

    const status = isNew ? 201 : 200;

    res.status(status).json({
      status,
      message: 'Contact upserted successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const result = await contactServices.updateContact({ _id: id, userId }, req.body);

    if (!result) {
      throw createHttpError(404, `Contact with id=${id} not found`);
    }

    res.json({
      status: 200,
      message: 'Contact patched successfully',
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const data = await contactServices.deleteContact({ _id: id, userId });

    if (!data) {
      throw createHttpError(404, `Contact with id=${id} not found`);
    }

    res.status(204).send();
  } catch (error) {
    next(error); 
  }
};
