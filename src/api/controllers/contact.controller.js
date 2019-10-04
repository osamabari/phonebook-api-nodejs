const httpStatus = require('http-status');
const Contact = require('../models/contact.model');
const makeResponse = require('../utils/APIResponse');

/**
 * Get contact
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const contact = await Contact.get(req.params.contactId, req.user._id);
    return makeResponse(res, httpStatus.OK, 'Success', [contact.transform()]);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new contact
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    return makeResponse(res, httpStatus.CREATED, 'Success', [savedContact.transform()]);
  } catch (error) {
    next(error);
  }
};


/**
 * Update existing contact
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const currentContact = await Contact.get(req.params.contactId, req.user._id);
    const contact = Object.assign(currentContact, req.body);
    const updatedContact = await contact.save();
    return makeResponse(res, httpStatus.OK, 'Success', [updatedContact.transform()]);
  } catch (error) {
    next(error);
  }
};

/**
 * Get contact list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    req.query.userId = req.user._id;
    const { contacts, total } = await Contact.list(req.query);
    const transformedUsers = contacts.map(contact => contact.transform());
    return makeResponse(res, httpStatus.OK, 'Success', [{ total, contacts: transformedUsers }]);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete contact
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    await Contact.remove(req.params.contactId, req.user._id);
    return makeResponse(res, httpStatus.OK, 'Success', []);
  } catch (error) {
    next(error);
  }
};
