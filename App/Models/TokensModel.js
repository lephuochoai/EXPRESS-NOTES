const  Model  = require('./Model');

class tokensModel extends Model {
    constructor() {
        super();
    }

    static get tableName() {
        return 'tokens'
    }
    
}
module.exports = tokensModel;