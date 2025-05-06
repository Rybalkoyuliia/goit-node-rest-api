import path from "path";
import { CONTACT_DB } from "../schemas/mngContactsSchema.js";

export const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  return await CONTACT_DB.find();
};

export const findContactById = async (id) => {
  return await CONTACT_DB.findOne({ _id: id });
};

export const removeContactById = async (id) => {
  return await CONTACT_DB.findByIdAndDelete(id);
};

export const addNewContact = async (data) => {
  return await CONTACT_DB.create(data);
};

export const updateContact = async (id, data) => {
  return await CONTACT_DB.findByIdAndUpdate({ _id: id }, data, { new: true });
};

export const changeFav = async (id, data) => {
  return await CONTACT_DB.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
};
