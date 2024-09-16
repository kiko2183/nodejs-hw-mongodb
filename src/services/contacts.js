import ContactCollection from "../db/Contacts.js";

export const getAllContacts = async () => {
  try {
    const contacts = await ContactCollection.find({});
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
    const contact = await ContactCollection.findById(id);
    
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
