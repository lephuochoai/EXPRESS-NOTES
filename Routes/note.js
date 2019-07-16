const express = require('express');
const router = express.Router();
const NoteController = require('../App/Controllers/Http/NoteController')
const AuthMiddleware = require('../App/Middlewares/AuthMiddleware');

router.use((req, res, next) => {
    AuthMiddleware.auth({ req, res, next });
})
router.get('/', (req, res, next) => {
    NoteController.getNotes({ req, res, next });
})

router.post('/', (req, res, next) => {
    NoteController.postNote({ req, res, next });
})

router.put('/:id', (req, res, next) => {
    NoteController.updateNote({ req, res, next })
})

router.delete('/:id', (req, res, next) => {
    NoteController.deleteNote({ req, res, next });
})

module.exports = router;
