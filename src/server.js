import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

import { env } from "./utils/env.js";
import * as contactServices from "./services/contacts.js";
import { initMongoConnection } from "./db/initMongoConnection.js";

export const startServer = async () => {
  await initMongoConnection();

  await importContacts(); 

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/contacts", handleGetAllContacts);
  app.get("/contacts/:contactId", handleGetContactById);

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  });

  const port = Number(env("PORT", 3000));
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

async function importContacts() {
  try {
    const filePath = path.join(__dirname, "../contacts.json");
    const data = fs.readFileSync(filePath, "utf8");
    const contacts = JSON.parse(data);

    await contactServices.addContacts(contacts);
    console.log("Contacts successfully imported into the database!");
  } catch (error) {
    console.error("Error importing contacts:", error);
  }
}

async function handleGetAllContacts(req, res, next) {
  try {
    const data = await contactServices.getAllContacts();
    res.status(200).json({
      status: "success",
      message: "Successfully found contacts!",
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function handleGetContactById(req, res, next) {
  const { contactId } = req.params;
  try {
    const data = await contactServices.getContactById(contactId);

    if (!data) {
      return res.status(404).json({
        message: `Contact with id=${contactId} not found`,
      });
    }

    res.status(200).json({
      status: "success",
      message: `Contact with id=${contactId} successfully found`,
      data,
    });
  } catch (error) {
    next(error); 
  }
}
