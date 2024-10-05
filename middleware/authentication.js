const ApiError = require('./errorhandler/api-error');
const { isTokenValid } = require('../utils/jwtUtils');

const isLoggedIn = (req, res, next) => {

    const authHeader = req.headers['authorization']
    console.log(authHeader)

    if (!authHeader){
        return next(ApiError.badRequest('unauthorized'))
    }

    if (authHeader.startsWith('Bearer')){

        const token = authHeader.split(' ')[1]

        try{
            const payload = isTokenValid(token);
            req.user = {userId: payload.id}
            next()
        }catch(error){
            console.log(error)
            return next(ApiError.badRequest('Authentication failed'))
        }
    }else{
        return next(ApiError.badRequest('Invalid authorization header'))
    }
}

module.exports = isLoggedIn;

