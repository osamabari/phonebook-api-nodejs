const httpStatus = require('http-status');
const User = require('../models/user.model');
const makeResponse = require('../utils/APIResponse');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => makeResponse(res, httpStatus.OK, 'Success', [req.user.transform()]);
