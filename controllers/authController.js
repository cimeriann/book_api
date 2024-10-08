//create user
// login
// reset password
const logger = require("../utils/logger");
const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../utils/errorHandler");
const {
  generateSecurePassword,
  checkValidity,
  createAccessToken,
  isTokenValid,
} = require("../utils/jwtUtils");
const User = require("../models/User");

exports.createUser = async (req, res, next) => {
  try {
    logger.info("START: Create User Service");

    const { firstName, lastName, userName, email, password } = req.body;
    console.log(firstName, lastName, userName, email);
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.info("END: Create User Service");
      return errorResponse(res, StatusCodes.BAD_REQUEST, "User already exists, login instead");
    }
    if (!firstName ||
        !lastName ||
        !userName ||
        !email ||
        !password
        ){
        logger.info("END: Create User Service");
        return errorResponse(res, StatusCodes.NOT_ACCEPTABLE,  'Please provide all parameters' )
    }
    if (password.length < 6) {
        logger.info(`END: Create User Service`)
        return errorResponse(res, StatusCodes.NOT_ACCEPTABLE, 'password length must be greater than or equal to six characters');
    }
    const newUser = await User.create({
        firstName: firstName, 
        lastName: lastName,
        email: email,
        userName: userName,
        password: generateSecurePassword(password),
    })

    const accessToken = createAccessToken(newUser._id)

    logger.info(`END: Create User Service`)
    successResponse(res, StatusCodes.CREATED, `successfully created account`, {user:newUser, token:accessToken})
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
    try {
        logger.info(`START: Login Account Service`);

        const { userName, password } = req.body;

        if (!userName || !password){
            return errorResponse(res, StatusCodes.BAD_REQUEST, `missing required auth parameters`)
        }

        const user = await User.findOne({ userName });
        if (!user) {
            return errorResponse(res, StatusCodes.NOT_FOUND, `User does not exist`);
        }

        if (!checkValidity(password, user.password)) {
            return errorResponse(res, StatusCodes.BAD_REQUEST, `You have entered a wrong username or password`);
        }

        const accessToken = createAccessToken(user._id);

        logger.info(`END: Login Account Service`);
        successResponse(res, StatusCodes.OK, `successfully logged in`, {user, token:accessToken});
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
};


exports.resetPassword = async (req, res, next) => {
    
    try {
        logger.info(`START: Reset Password Service`)
        const { userName, password, newPassword } = req.body;

        const user = await User.findOne({ userName: userName });
        if(!user){
            return errorResponse(res, StatusCodes.NOT_FOUND, `User does not exist`);
        }
        if (!checkValidity(password, user.password)) {
            return errorResponse(res, StatusCodes.BAD_REQUEST, `You have entered a wrong username or password`);
        }

        user.password = generateSecurePassword(newPassword);

        const accessToken = createAccessToken(user._id);

        successResponse(res, StatusCodes.OK, `successfully reset password`, {user, token:accessToken})
        logger.info(`END: Reset Password Service`)


    } catch (error) {
        logger.error(error);
        next(error);
    }
}
