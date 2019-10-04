const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');


/**
 * Contact Schema
 * @private
 */
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
    default: '',
  },
  address: {
    type: String,
    trim: true,
    default: '',
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  mobile: {
    type: String,
    trim: true,
    default: '',
  },
  picture: {
    type: String,
    trim: true,
    default: '',
  },
  userId: {
    type: String,
  },
}, {
  timestamps: true,
});


/**
 * Methods
 */
contactSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'firstName', 'lastName', 'email', 'phone', 'mobile', 'address', 'picture', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

});

/**
 * Statics
 */
contactSchema.statics = {

  /**
   * Get contact
   *
   * @param {ObjectId} id - The objectId of contact.
   * @returns {Promise<Contact, APIError>}
   */
  async get(id, userId) {
    try {
      let contact;

      if (mongoose.Types.ObjectId.isValid(id)) {
        contact = await this.findById(id).exec();
      }

      if (contact && contact.userId === userId.toString()) {
        return contact;
      }

      throw new APIError({
        message: 'Contact does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List contacts in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of contacts to be skipped.
   * @param {number} limit - Limit number of contacts to be returned.
   * @returns {Promise<Contact[]>}
   */
  async list({
    page = 1, perPage = 30, userId,
  }) {
    const options = omitBy({}, isNil);
    return {
      total: await this.count({ userId }),
      contacts: await this.find({ userId }, options)
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .exec(),
    };
  },

  /**
   * Remove contact
   *
   * @param {ObjectId} id - The objectId of contact.
   * @returns {Promise<Contact, APIError>}
   */
  async remove(id, userId) {
    try {
      let contact;

      if (mongoose.Types.ObjectId.isValid(id)) {
        contact = await this.findById(id).exec();
      }

      if (contact && contact.userId === userId.toString()) {
        return contact.remove();
      }

      throw new APIError({
        message: 'Contact does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },


};

/**
 * @typedef Contact
 */
module.exports = mongoose.model('Contact', contactSchema);
