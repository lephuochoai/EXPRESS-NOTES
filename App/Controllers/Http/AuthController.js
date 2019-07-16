
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../../Service/AuthService')

class AuthController {
    constructor() {
        this.authService = authService;
    }

    async register({ req, res, next }){
       
        const { body } = req;
                
        const result = await this.authService.register(body);

        return res.json(result);
        
    }

    async login({ req, res, next }) {
        const { body } = req;

        const result = await this.authService.login(body);

        return res.json(result);
    }

    async logout({ req, res, next }) {
        const { headers } = req;
        
        const result = await this.authService.logout(headers);
        console.log(result);
        
        return res.json(result);
        
    }
}

module.exports = new AuthController();
