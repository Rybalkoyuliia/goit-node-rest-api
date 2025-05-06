import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  changeFav,
} from "../controllers/contactsControllers.js";
import { isBodyEmpty } from "../middlewares/isBodyEmpty.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", isBodyEmpty, createContact);

contactsRouter.put("/:id", isBodyEmpty, updateContact);

contactsRouter.patch("/:id/favorite", isBodyEmpty, changeFav);

export default contactsRouter;
