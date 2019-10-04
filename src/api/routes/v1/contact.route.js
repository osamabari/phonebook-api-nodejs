const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/contact.controller');
const { authorize } = require('../../middlewares/auth');
const {
  listContacts,
  createContact,
  updateContact,
  deleteContact,
  getContact,
} = require('../../validations/contact.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/contacts List Contacts
   * @apiSampleRequest http://localhost:3000/v1/contacts/
   * @apiDescription Get a list of contacts
   * @apiVersion 1.0.0
   * @apiName ListContacts
   * @apiGroup Contact
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Contacts per page
   *
   * @apiSuccess {Object[]} contacts List of contacts.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated contacts can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), validate(listContacts), controller.list)
  /**
   * @api {post} v1/contact Create Contact
   * @apiSampleRequest http://localhost:3000/v1/contacts
   * @apiDescription Create a new contact
   * @apiVersion 1.0.0
   * @apiName CreateContact
   * @apiGroup Contact
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             email     Contact's email
   * @apiParam  {String{..128}}      firstName    Contact's First Name
   * @apiParam  {String}  lastName    Contact's Last Name
   * @apiParam  {String}  phone    Contact's Phone
   * @apiParam  {String}  mobile    Contact's Mobile
   * @apiParam  {String}  address    Contact's Address
   * @apiParam  {String}  picture    Contact's Picture Url
   * 
   *
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated contacts can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(), validate(createContact), controller.create);

router
  .route('/:contactId')
  
  .get(authorize(), validate(getContact), controller.get)
  /**
   * @api {patch} v1/contacts/:id Update Contact
   * @apiSampleRequest http://localhost:3000/v1/contacts/:id
   * @apiDescription Update some fields of a contact document
   * @apiVersion 1.0.0
   * @apiName UpdateContact
   * @apiGroup Contact
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             email     Contact's email
   * @apiParam  {String{..128}}      firstName    Contact's First Name
   * @apiParam  {String}  lastName    Contact's Last Name
   * @apiParam  {String}  phone    Contact's Phone
   * @apiParam  {String}  mobile    Contact's Mobile
   * @apiParam  {String}  address    Contact's Address
   * @apiParam  {String}  picture    Contact's Picture Url
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated contacts can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only contact with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Contact does not exist
   */
  .patch(authorize(), validate(updateContact), controller.update)
  /**
   * @api {delete} v1/contacts/:id Delete Contact
   * @apiSampleRequest http://localhost:3000/v1/contacts/:id
   * @apiDescription Delete a contact
   * @apiVersion 1.0.0
   * @apiName DeleteContact
   * @apiGroup Contact
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated contacts can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only contact with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Contact does not exist
   */
  .delete(authorize(), validate(deleteContact), controller.remove);

module.exports = router;
