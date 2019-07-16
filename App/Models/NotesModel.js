const  Model  = require('./Model');

class notesModel extends Model {
    constructor() {
        super();
    }

    static get tableName() {
        return 'notes'
    }
    
}
module.exports = notesModel;