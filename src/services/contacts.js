import ContactCollection from "../db/Contacts.js";
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
export const getContacts = async ({
    perPage,
    page, 
    sortBy = "_id", 
    sortOrder = SORT_ORDER[0],
    filter = {},
})=> {
    const skip = (page - 1) * perPage;
    const contactQuery = ContactCollection.find(); 
    
    if(filter.minReleaseYear) {
        contactQuery.where("releaseYear").gte(filter.minReleaseYear);
    }
    if(filter.maxReleaseYear) {
        contactQuery.where("releaseYear").lte(filter.maxReleaseYear);
    }
    if(filter.userId) {
        contactQuery.where("userId").eq(filter.userId);
    }

    const movies = await contactQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
    
    const count = await ContactCollection.find().merge(contactQuery).countDocuments();

    const paginationData = calculatePaginationData({count, perPage, page});

    return {
        page,
        perPage,
        movies,
        totalItems: count,
        ...paginationData,
    };
};

export const getContact = ({ _id, userId }) => 
    ContactCollection.findOne({ _id, userId });

export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async ({ id, userId }, data, options = {}) => {
    const updatedContact = await ContactCollection.findOneAndUpdate(
        { _id: id, userId },
        data,
        { new: true, ...options }
    );
    return updatedContact ? updatedContact : null;
};

export const deleteContact = async ({ id, userId }) => {
    const deletedContact = await ContactCollection.findOneAndDelete(
        { _id: id, userId }
    );
    return deletedContact ? deletedContact : null;
};