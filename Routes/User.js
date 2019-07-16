const express = require('express');

const router = express.Router();

const UserController = require('../App/Controllers/Http/UserController');

const AuthMiddleware = require('../App/Middlewares/AuthMiddleware');

// Check auth middleware
router.use((req, res, next) => {
    AuthMiddleware.auth({ req, res, next });
})

router.get('/:id', (req, res, next) => {
    UserController.profile({ req, res, next });
})

router.put('/update-name', (req, res, next) => {
    UserController.updateName({ req, res, next });
})

module.exports = router