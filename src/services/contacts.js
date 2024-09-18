import ContactCollection from "../db/Contacts.js";

export const getAllContacts = async () => {
  try {
    const contacts = await ContactCollection.find({}).select("-__v"); 
    return contacts; 
  } catch (error) {
    console.error("Error fetching all contacts:", error.message);
    throw new Error("Could not fetch contacts");
  }
};

export const getContactById = async (id) => {
  try {
    const contact = await ContactCollection.findById(id).select("-__v");
    
    if (!contact) {
      return null; 
    }

    return contact; 
  } catch (error) {
    console.error(`Error fetching contact by ID ${id}:`, error.message);
    throw new Error("Could not fetch contact");
  }
};
