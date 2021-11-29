/** @format */
const { getSignatureByUserId } = require("./database.js");

function userLoggedOutRedirect(request, response, next) {
    if (!request.session.user_id) {
        response.redirect("/login");
        return;
    }
    next();
}

function userLoggedInRedirect(request, response, next) {
    if (request.session.user_id) {
        response.redirect("/thank_you");
        console.log("user check");
        return;
    }
    next();
}

function requireSignature(request, response, next) {
    getSignatureByUserId(request.session.user_id).then((signature) => {
        if (signature) {
            next();
            return;
        }
        response.redirect("/petition");
    });
}

function hasSignature(request, response, next) {
    getSignatureByUserId(request.session.user_id).then((signature) => {
        if (!signature) {
            next();
            return;
        }
        response.redirect("/thank_you");
    });
}

module.exports = {
    userLoggedOutRedirect,
    userLoggedInRedirect,
    requireSignature,
    hasSignature,
};
