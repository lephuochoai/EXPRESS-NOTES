const  Model  = require('./Model');

class usersModel extends Model {
    constructor() {
        super();
    }

    static get tableName(){
        return 'users';
    }
}

module.exports = usersModel;
