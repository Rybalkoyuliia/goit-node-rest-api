import path from "path";
import { CONTACT_DB } from "../models/contactsSchema.js";

export const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = ({ filter = {}, fields, settings = {} }) =>
  CONTACT_DB.find(filter, fields, settings).populate("owner", "email");

export const findContact = (filter) => CONTACT_DB.findOne(filter);

export const removeContact = (filter) => CONTACT_DB.findOneAndDelete(filter);

export const addNewContact = (data) => CONTACT_DB.create(data);

export const updateContact = (filter, data) =>
  CONTACT_DB.findOneAndUpdate(filter, data);

export const changeFav = (id, data) =>
  CONTACT_DB.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
