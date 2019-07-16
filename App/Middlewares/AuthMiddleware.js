const jwt = require('jsonwebtoken');
const tokensModel = require('../Models/TokensModel');
const usersModel = require('../Models/UsersModel');
class AuthMiddleware {
    constructor() {
        this.tokensModel = tokensModel;
        this.usersModel = usersModel;
    }

    // Check auth of user
    auth({ req, res, next }) {
        console.log('check authMiddleware');
        
        const { headers } = req;
        const token = headers.authorization;        
        if(!token) {
            return next({
                message: 'Unauthorization',
                data: null
            });
        }
        jwt.verify(token, Env.APP_KEY, async (err, decoded) => {
            if(err) {
                return res.json({
                    message: 'Decode token wrong!!! Check token.',
                    data: null
                })
            }
            const idToken = decoded.id;

            const tokensDB = await tokensModel.query()
            .where('user_id', idToken);
            const tokenDB = tokensDB.filter(tokenGetDB => tokenGetDB.token === token);
            // console.log('GET token from DB: ',tokenDB[0]);

            if(!tokenDB.length || tokenDB[0].status === 0) {
                return res.json({
                    message: 'Token expired, loggin again',
                    data: null
                })
            }

            next();
        });    
    }

    noAuth() {
        // TODO No Auth
        // Không cần phải đăng nhập vẫn có 1 số chức năng.
    }
    
}

module.exports = new AuthMiddleware();
