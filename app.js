import express from "express";
import morgan from "morgan";
import cors from "cors";

import mongoose from "mongoose";
import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";

const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Server is running. Use our API on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });
