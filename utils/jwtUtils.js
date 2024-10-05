const bcrypt = require('bcryptjs');
const { compareSync, hashSync, genSaltSync } = bcrypt;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;
const { sign, verify } = jwt;

const generateSecurePassword = (password) =>{
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

const checkValidity = (value, otherValue) => {
    return compareSync(value, otherValue);
}

const createAccessToken = (id) => {
    const token = sign({id}, jwt_secret);
    return token;
}

const isTokenValid = (token) => {
    return verify(token, jwt_secret)
}

module.exports = {
    generateSecurePassword,
    checkValidity,
    isTokenValid,
    createAccessToken
}