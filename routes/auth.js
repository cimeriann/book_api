const {
  createUser,
  login,
  resetPassword,
} = require("../controllers/authController");
const express = require('express');
const authRouter = express.Router();

authRouter.post('/createUser', createUser);

authRouter.post('/login', login);

authRouter.post('/resetPassword', resetPassword);

module.exports = authRouter;