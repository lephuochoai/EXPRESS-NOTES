const express = require('express');

const router = express.Router();

const AuthController = require('../App/Controllers/Http/AuthController');

const AuthMiddleware = require('../App/Middlewares/AuthMiddleware');

const { validationResult } = require('express-validator');


// import validate
const RegisterValidator = require('../App/Validator/Register.Validator');

// router.post('/register', RegisterValidator, (req, res, next) => {
router.post('/register', (req, res, next) => {
    // const err = validationResult(req);

    // console.log(err);
    
    AuthController.register({ req, res, next });  
})

router.post('/login',(req, res, next) => {
    AuthController.login({ req, res, next });
})

// Check auth middleware
router.use((req, res, next) => {
    AuthMiddleware.auth({ req, res, next });
})

router.post('/logout', (req, res, next) => {
    AuthController.logout({ req, res, next });
})

module.exports = router;
