import { Schema, model } from "mongoose";
import { handleSaveError, setUpdSettings } from "./hooks.js";
import emailPattern from "../constants/constants.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailPattern,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre("findOneAndUpdate", setUpdSettings);

contactSchema.post("save", handleSaveError);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const CONTACT_DB = model("contact", contactSchema);
