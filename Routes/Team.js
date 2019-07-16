const express = require('express');

const AuthMiddleware = require('../App/Middlewares/AuthMiddleware');

const router = express.Router();

router.use((req, res, next) => {
    AuthMiddleware.auth({ req, res, next });
})

router.post('/', (req, res, next) => {
    res.json({
        message: 'success',
        data: null
    })
} )

module.exports = router;