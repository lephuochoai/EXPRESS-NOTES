const usersModel = require('../../Models/UsersModel');
const tokensModel = require('../../Models/TokensModel');

class UserController {
    constructor() {
        // super();
        this.usersModel = usersModel;
        this.tokensModel = tokensModel;
    }

    async profile({ req, res, next }) {
        // const { params } = req;
        // const user = await this.usersModel.query()
        //     .where('id', params.id)
        //     .first();
        // if(!user) {
        //     return res.json({
        //         message: 'id user wrong!!!',
        //         data: null
        //     })
        // }

        // return res.json({
        //     message: 'Response profile user success',
        //     data: {
        //         id: user.id,
        //         username: user.username,
        //         name: user.name,
        //         created_at: user.created_at,
        //         updated_at: user.updated_at
        //     }
        // })
    }

    async updateName({ req, res, next }) {
        // const { body } = req;
        // console.log(body.username, body.name);

        // if (!body.username || !body.name) {
        //     return res.json({
        //         message: 'Username or name isn\'t require!!!',
        //         data: null
        //     })
        // }
        // try {
        //     await this.usersModel.query().select('name', 'username')
        //         .update({ 'name': body.name })
        //         .where('username', body.username)
        //     res.json({
        //         message: 'Update Name User Success',
        //         data: null
        //     })
        // }
        // catch {
        //     return res.json({
        //         message: 'Update database wrong',
        //         data: null
        //     })
        // }
    }
}

module.exports = new UserController();