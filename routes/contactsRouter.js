import express from "express";

import contactsController from "../controllers/contactsControllers.js";

import isBodyEmpty from "../middlewares/isBodyEmpty.js";
import isValid from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", isValid, contactsController.getOneContact);

contactsRouter.delete("/:id", isValid, contactsController.deleteContact);

contactsRouter.post("/", isBodyEmpty, contactsController.createContact);

contactsRouter.put(
  "/:id",
  isBodyEmpty,
  isValid,
  contactsController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isBodyEmpty,
  contactsController.changeFav
);

export default contactsRouter;
