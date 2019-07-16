const usersModel = require('../Models/UsersModel');
const tokensModel = require('../Models/TokensModel');
const Bcrypt = require('../../Helper/BcryptPassword');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class AuthService {
    constructor() {
        this.usersModel = usersModel;
        this.tokensModel = tokensModel;
    }
    
    async register(body) {
        try {
              
            if(!body.username || !body.password || !body.name || !body.email) {
                return {
                    success: false,
                    message: 'username or password or name or email is required',
                    result: null
                }
            }

            const user = await this.usersModel.query()
            .where('username', body.username)
            .first();
            if(user) {
                return{
                    success: false,
                    message: 'user is exit',
                    data: null
                }
            }
            
            const password = Bcrypt.hash(body.password, 10);
                    
            const dataInsert = {
                username: body.username,
                password,
                name: body.name,
                email: body.email
            }
    
            const userInserted = await this.usersModel.query().insert(dataInsert);
            console.log('Register success user: ',userInserted);
                
            const token = jwt.sign({
                id: userInserted.id,
                timestamp: new Date().getTime()
            }, Env.APP_KEY);
            
            const dataTokenInsert = {
                user_id: userInserted.id,
                token: token,
                status: 1
            }
    
            await this.tokensModel.query().insert(dataTokenInsert);
    
            console.log('Token: ', dataTokenInsert);
    
            return {
                success: true,
                message: 'Register Success!!',
                result: {
                    id: userInserted.id,
                    username: userInserted.username,
                    name: userInserted.name,
                    token: token
                }
            }
        } catch (error) {
            return {
                success: false,
                message: 'CATCH err register',
                result: null
            }
        }
    }


    async login (body) {

        try {
            if(!body.username || !body.password) {
                return ({
                    success: false,
                        message: 'username or password is required',
                        result: null
                })
            }
    
            const user = await this.usersModel.query()
            .where('username', body.username)
            .first();
    
            if(!user) {
                return {
                    success: false,
                    message: 'username is wrong!!!',
                    data: null
                }
            }
            console.log('Found user: ', user);
            if(!Bcrypt.compare(body.password, user.password)) {
                return {
                    success: false,
                    message: 'Password is wrong!!!',
                    data: null
                }
            }
    
            const token = jwt.sign({
                id: user.id,
                timestamp: new Date().getTime()
            }, Env.APP_KEY);
    
            const dataTokenInsert = {
                user_id: user.id,
                token: token,
                status: 1
            }
            console.log(dataTokenInsert);
            
            await this.tokensModel.query()
                .insert(dataTokenInsert)
    
            return {
                success: true,
                message: 'Login success',
                result: {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    token: token
                }
            }
        } catch (error) {
            return {
                success: false,
                message: 'CATCH err login',                
                result: null
            }
        }
    }

    async logout(headers) {
        
        try {
            if(!headers.authorization) {
                return {
                    success: false,
                    message: 'Token isn\'t require!!!',
                    result: null
                }
            }
    
            const token = headers.authorization;
            
            const decoded = await jwt.verify(token, Env.APP_KEY);

            if(!decoded) {
                return {
                    success: false,
                    message: 'Decode token wrong!!! Check token.',
                    result: null
                }
            }

            const idToken = decoded.id;
            await this.tokensModel.query().where('user_id', idToken).del();
            
            return {
                success: true,
                message: 'Logout success',
                result: null
            }
            
        } catch (error) {
            return {
                success: false,
                message: 'CATCH err logout',
                result: null
            }
        }
    }
}

module.exports = new AuthService();
