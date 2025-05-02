import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

export const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const findContactById = async (id) => {
  const contactList = await listContacts();
  const contact = contactList.find((contact) => contact.id === id);
  return contact || null;
};

export const removeContactById = async (id) => {
  const contactList = await listContacts();
  const contact = contactList.find((contact) => contact.id === id);
  if (!contact) {
    return null;
  }
  const updatedList = contactList.filter((contact) => contact.id !== id);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(updatedList, null, 2),
    "utf-8"
  );
  return contact;
};

export const addNewContact = async (data) => {
  const contactList = await listContacts();
  const newContact = {
    ...data,
    id: nanoid(),
  };
  contactList.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactList, null, 2),
    "utf-8"
  );

  return newContact || null;
};

export const updateContact = async (id, data) => {
  const contactList = await listContacts();
  const contactIndex = contactList.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return null;
  }

  const updatedContact = {
    ...contactList[contactIndex],
    ...data,
  };

  contactList[contactIndex] = updatedContact;

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactList, null, 2),
    "utf-8"
  );
  return updatedContact;
};
