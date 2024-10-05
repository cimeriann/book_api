const ApiError = require('./errorhandler/api-error.js');


const notFound = (req, res, next) => {

    next(ApiError.notFound())
}

module.exports =  notFound;