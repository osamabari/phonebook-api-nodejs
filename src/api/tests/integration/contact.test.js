/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const { some, omitBy, isNil } = require('lodash');
const app = require('../../../index');
const Contact = require('../../models/contact.model');
const User = require('../../models/user.model');
const JWT_EXPIRATION = require('../../../config/vars').jwtExpirationInterval;

/**
 * root level hooks
 */

async function format(contact) {
  // get contacts from database
  const dbUser = (await Contact.findOne({ email: user.email })).transform();

  // remove null and undefined properties
  return omitBy(dbUser, isNil);
}


describe('Contacts API', async () => {
  let userAccessToken;
  let dbUsers;
  let contact;

  const password = '123456';
  const passwordHashed = await bcrypt.hash(password, 1);


  beforeEach(async () => {
    dbUsers = {
      osamaBari: {
        email: 'osamabari@hotmail.com',
        password: passwordHashed,
        name: 'Osama Bari',
      },
      jonSnow: {
        email: 'jonsnow@gmail.com',
        password: passwordHashed,
        name: 'Jon Snow',
      },
    };

    contact = {
      email: "osamabari@hotmail.com",
      firstName: "Osama",
      lastName: "Bari",
      phone: "0401231231",
      mobile: "0501231231",
      address: "Business bay, Dubai, UAE",
      picture: "https://avatars1.githubusercontent.com/u/13195588?s=460&v=4"
    };

    await User.remove({});
    await User.insertMany([dbUsers.osamaBari, dbUsers.jonSnow]);
    dbUsers.jonSnow.password = password;
    userAccessToken = (await User.findAndGenerateToken(dbUsers.jonSnow)).accessToken;
  });


  describe('POST /v1/contacts', () => {
    it('should create a new contact when request is ok', () => {
      return request(app)
        .post('/v1/contacts')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(contact)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.result[0]).to.include(contact);
        });
    });

    it('should report error when email is not provided', () => {
      delete contact.email;

      return request(app)
        .post('/v1/contacts')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(contact)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          const { field } = res.body.errors[0];
          const { location } = res.body.errors[0];
          const { messages } = res.body.errors[0];
          expect(field).to.be.equal('email');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"email" is required');
        });
    });
  });

  describe('GET /v1/contacts', () => {
    it('should get all contacts with pagination', () => {
      return request(app)
        .get('/v1/contacts')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .query({ page: 1, perPage: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.result).to.be.an('array');
          expect(res.body.result).to.have.lengthOf(1);
        });
    });

    it('should report error when pagination\'s parameters are not a number', () => {
      return request(app)
        .get('/v1/contacts')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .query({ page: '?', perPage: 'whaat' })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          const { field } = res.body.errors[0];
          const { location } = res.body.errors[0];
          const { messages } = res.body.errors[0];
          expect(field).to.be.equal('page');
          expect(location).to.be.equal('query');
          expect(messages).to.include('"page" must be a number');
          return Promise.resolve(res);
        })
        .then((res) => {
          const { field } = res.body.errors[1];
          const { location } = res.body.errors[1];
          const { messages } = res.body.errors[1];
          expect(field).to.be.equal('perPage');
          expect(location).to.be.equal('query');
          expect(messages).to.include('"perPage" must be a number');
        });
    });


    it('should report error "User does not exist" when user does not exists', () => {
      return request(app)
        .get('/v1/contacts/56c787ccc67fc16ccc1a5e92')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('Contact does not exist');
        });
    });

    it('should report error "Bad Req" when id is not a valid ObjectID', () => {
      return request(app)
        .get('/v1/contacts/asdm1203asds')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.code).to.be.equal(400);
        });
    });
  });


});
