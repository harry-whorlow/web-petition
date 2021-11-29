/** @format */

const bcrypt = require("bcryptjs");

const { getUserByEmail } = require("./database");

// function checkLogin({ email, password }) {
//     return getUserByEmail(email).then(foundUser => {
//         if (!foundUser) {
//             return null;
//         }
//         return compare(password, foundUser.password_hash).then((match) => {
//             if (match) {
//                 return foundUser;
//             }
//             return null;
//         });
//     );
// }

function hash(password) {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
}

function checkLogin({ email, password }) {
    return getUserByEmail(email).then((foundUser) => {
        if (!foundUser) {
            return null;
        }
        return bcrypt
            .compare(password, foundUser.password_hash)
            .then((match) => {
                if (match) {
                    return foundUser;
                }
                return null;
            });
    });
}

module.exports = {
    checkLogin,
    hash,
};
