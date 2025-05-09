import path from "path";
import { CONTACT_DB } from "../models/contactsSchema.js";

export const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = ({ filter = {}, fields, settings = {} }) =>
  CONTACT_DB.find(filter, fields, settings);

export const findContactById = (id) => CONTACT_DB.findById(id);

export const removeContactById = (id) => CONTACT_DB.findByIdAndDelete(id);

export const addNewContact = (data) => CONTACT_DB.create(data);

export const updateContact = (id, data) =>
  CONTACT_DB.findByIdAndUpdate(id, data);

export const changeFav = (id, data) =>
  CONTACT_DB.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
