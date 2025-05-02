import fs from "fs/promises";
import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactSchemas.js";

export const getAllContacts = async (_, res) => {
  const responce = await contactsService.listContacts();
  res.json(responce);
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.findContactById(id);
    if (!contact) {
      throw HttpError(404, `Contact with id "${id}" wasn't found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await contactsService.removeContactById(id);
    if (!removedContact) {
      throw HttpError(404, `Contact with id "${id}" wasn't found`);
    }
    res.status(200).json(removedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addNewContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    const { id } = req.params;
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
