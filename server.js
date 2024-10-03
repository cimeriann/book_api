const express = require('express');
const connectDb = require('./config/db');
const logger = require('./utils/logger');
require('dotenv').config();
const port = process.env.PORT || 4000;
const app = express();


app.use(express.json());

//connect database
connectDb();

app.get('/', ()=> {
    logger.info("Books API")
});

app.listen(() => {
    logger.info(`START: server listening on http:127.0.0.1:${port}`);
})