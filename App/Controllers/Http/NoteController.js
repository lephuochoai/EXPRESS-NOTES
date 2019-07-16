const NoteService = require('../../Service/NoteService')

class NoteController {

    async getNotes({ req, res, next }) {

        const { headers } = req;

        const result = await NoteService.getNotes(headers);
        res.json(result);
    }

    async postNote({ req, res, next }) {
        
        const { body } = req;
        const { headers } = req;

        const result = await NoteService.postNote(body, headers);        
        return res.json(result);
    }

    async updateNote({ req, res, next }) {

        const { params, body, headers } = req;

        const result = await NoteService.updateNote(params, body, headers);
        res.json(result);
    }

    async deleteNote({ req, res, next }) {
        
        const { params, headers } = req;

        const result = await NoteService.deleteNote(params, headers);
        res.json(result);
    }
}

module.exports = new NoteController();
