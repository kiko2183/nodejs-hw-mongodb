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

export const updateContact = async (id, updateData) => {
  try {
    const updatedContact = await ContactCollection.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      select: "-__v",
    });

    if (!updatedContact) {
      return null;
    }
    
    return updatedContact;
  } catch (error) {
    console.error(`Error updating contact by ID ${id}:`, error.message);
    throw new Error("Could not update contact");
  }
};

export const deleteContact = async (id) => {
  try {
    const deletedContact = await ContactCollection.findByIdAndDelete(id).select("-__v");
    
    if (!deletedContact) {
      return null; 
    }

    return deletedContact;
  } catch (error) {
    console.error(`Error deleting contact by ID ${id}:`, error.message);
    throw new Error("Could not delete contact");
  }
};
