const mongoose = require("mongoose");
const logger = require("../utils/logger");
const { error } = require("winston");
require("dotenv").config();

const mongo_uri = process.env.MONGO_URI;

const connectDb = async () => {
  await mongoose
    .connect(mongo_uri)
    .then(
      logger.info(`Successfully connected to database`))
    .catch((error) => {
      logger.error("Failed to connect to database");
    });
};

module.exports = connectDb;
