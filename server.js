const express = require('express');
const connectDb = require('./config/db');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorhandler/index');
const bookRouter = require('./routes/books');
const authRouter = require('./routes/auth');
const { notFound } = require('./middleware/errorhandler/api-error');
require('dotenv').config();
const port = process.env.PORT;
const app = express();

//middleware
app.use(express.json());
// app.use(notFound);
app.use(errorHandler);
//connect database
connectDb();

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);
app.get('/', (req, res)=> {
    res.send('Books API');
    logger.info("Books API");
});

app.listen(port, () => {
    logger.info(`START: server listening on http://localhost:${port}`);
})