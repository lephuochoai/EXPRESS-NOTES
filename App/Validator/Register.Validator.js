
const { body } = require('express-validator');

module.exports = [
    body('username')
        .exists()
        .withMessage('Username is not require')
        .not()
        .isEmpty()
        .withMessage('Username is not require'),

    body('password')
        .exists()
        .withMessage('Username is not require')
        .isLength({
            min: 8
        })
        .withMessage('Password min length is 8')
]
