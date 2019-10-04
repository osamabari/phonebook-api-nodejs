const Joi = require('joi');

module.exports = {

  // GET /v1/contacts
  listContacts: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
    },
  },

  // POST /v1/contacts
  createContact: {
    body: {
      email: Joi.string().email().required(),
      firstName: Joi.string().max(128).required(),
      lastName: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
      mobile: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
      picture: Joi.string().required(),
    },
  },

  // PATCH /v1/contacts/:contactId
  updateContact: {
    body: {
      email: Joi.string().email().required(),
      firstName: Joi.string().max(128).required(),
      lastName: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
      mobile: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
      picture: Joi.string().required(),
    },
    params: {
      contactId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // GET /v1/contacts/:contactId
  deleteContact: {
    params: {
      contactId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // GET /v1/contacts/:contactId
  getContact: {
    params: {
      contactId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
