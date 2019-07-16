const jwt = require('jsonwebtoken');
const notesModel = require('../Models/NotesModel');

class NoteService {
    constructor() {
        this.notesModel = notesModel;
    }
    
    async getNotes(headers) {

        const token = headers.authorization;
        const decoded = await jwt.verify(token, Env.APP_KEY);
        if(!decoded) {
            return {
                success: false,
                message: 'Decode token wrong!!! Check token.',
                result: null
            }
        }
        const result = await this.notesModel.query().where('user_id',decoded.id)

        return {
            success: true,
            message: 'GET notes success',
            result
        }
    }

    async postNote(body, headers) {
        if(!body.title || !body.content) {
            return {
                success: false,
                message: 'Title or content not require',
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

        const resultInsert = await this.notesModel.query().insert({
            user_id: idToken,
            title: body.title,
            content: body.content
        });
        // console.log(resultInsert.id);
        
        const result = await this.notesModel.query().select().where('id', resultInsert.id).first();
        console.log(result);
        
        return {
            success: true,
            message: 'POST note success',
            result
        }
    }

    async updateNote(params, body, headers) {
        
        if(!body.title || !body.content) {
            return {
                success: false,
                message: 'Title or content not require!!',
                result: null
            }
        }

        const id = params.id;
        const token = headers.authorization;
        const decoded = await jwt.verify(token, Env.APP_KEY);

        if(!decoded) {
            return {
                success: false,
                message: 'Decode token wrong!!! Check token.',
                result: null
            }
        }
        await this.notesModel.query().update({
            title: body.title, content: body.content, updated_at: new Date()
        }).where({ 'id': id, 'user_id': decoded.id});

        const result = await this.notesModel.query().where('id', id).first();
        console.log('updated: ', result);
        
        return {
            success: true,
            message: 'Update note success',
            result: {
                updated_at: result.updated_at
            }
        }
    }

    async deleteNote(params, headers) {

        const id = params.id;
        const token = headers.authorization;
        const decoded = await jwt.verify(token, Env.APP_KEY);

        if(!decoded) {
            return {
                success: false,
                message: 'Decode token wrong!!! Check token.',
                result: null
            }
        }

        // const searchNote = await this.notesModel.query().where({
        //     id, 
        //     user_id: decoded.id
        // })

        // if(searchNote.length === 0) {
        //     return {
        //         success: false,
        //         message: 'Not find note',
        //         result: null
        //     }
        // }

        const resultDeleteNote = await this.notesModel.query().where({
            id, 
            user_id: decoded.id
        }).del();

        if(resultDeleteNote === 0) {
            return {
                success: false,
                message: 'Not find note',
                result: null
            }
        }
        
        return {
            success: true,
            message: 'Delete note success',
            result: resultDeleteNote
        }
    }
}

module.exports = new NoteService();
