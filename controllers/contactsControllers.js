import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

import ctrlWrapper from "../decorators/cntrWrapper.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../models/contactsSchema.js";

const getAllContacts = async (req, res) => {
  const fields = "-createdAt -updatedAt";
  const { _id: owner } = req.user;
  const filter = { owner };
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const responce = await contactsService.listContacts({
    filter,
    fields,
    settings,
  });
  res.json(responce);
};

const getOneContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const contact = await contactsService.findContact({ owner, _id });
  if (!contact) {
    throw HttpError(404, `Contact with id "${id}" wasn't found`);
  }
  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const removedContact = await contactsService.removeContact({
    owner,
    _id: id,
  });
  if (!removedContact) {
    throw HttpError(404, `Contact with id "${id}" wasn't found`);
  }
  res.status(200).json(removedContact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await contactsService.addNewContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await contactsService.updateContact(
    { owner, _id: id },
    req.body
  );

  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};

const changeFav = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  const { id } = req.params;
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsService.changeFav(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  changeFav: ctrlWrapper(changeFav),
};
