import express from "express";
import cors from "cors";

import { env } from "./utils/env.js";
import * as contactServices from "./services/contacts.js";

export const startServer = () => {
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
    res.status(500).json({
      message: error.message,
    });
  });

  const port = Number(env("PORT", 3000));
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

async function handleGetAllContacts(req, res) {
  try {
    const data = await contactServices.getAllContacts();
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function handleGetContactById(req, res) {
  const { contactId } = req.params;
  try {
    const data = await contactServices.getContactById(contactId);

    if (!data) {
      return res.status(404).json({
        message: `Contact with id=${contactId} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Contact with id=${contactId} successfully found`,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
