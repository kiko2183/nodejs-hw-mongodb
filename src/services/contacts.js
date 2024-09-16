import fs from "fs/promises";
import path from "path";

const contactsFilePath = path.join(process.cwd(), "src/db/contacts.json");

export const getAllContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
    const contacts = JSON.parse(data);
    return {
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    };
  } catch (error) {
    console.error("Error fetching all contacts:", error.message);
    throw new Error("Could not fetch contacts");
  }
};

export const getContactById = async (id) => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => contact.phoneNumber === id);

    if (!contact) {
      return {
        status: 404,
        message: `Contact with ID ${id} not found`,
      };
    }

    return {
      status: 200,
      message: `Successfully found contact with ID ${id}!`,
      data: contact,
    };
  } catch (error) {
    console.error(`Error fetching contact by ID ${id}:`, error.message);
    throw new Error("Could not fetch contact");
  }
};
