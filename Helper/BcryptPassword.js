const bcrypt = require('bcrypt');

module.exports.hash = (myPlaintextPassword, salt) => {
    return bcrypt.hashSync(myPlaintextPassword, salt);
}

module.exports.compare = (myPlaintextPassword, hash) => {
    return bcrypt.compareSync(myPlaintextPassword, hash)
}