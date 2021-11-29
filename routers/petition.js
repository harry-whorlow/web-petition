/** @format */
const express = require("express");
const router = express.Router();

const { createSignature } = require("../database");
const { userLoggedOutRedirect, hasSignature } = require("../middlewear");

router.get(
    "/petition",
    userLoggedOutRedirect,
    hasSignature,
    (request, response) => {
        response.render("pages/petition");
    }
);

router.post("/petition", (request, response) => {
    const { api_key, signature_data } = request.body;
    createSignature({
        user_id: request.session.user_id,
        api_key,
        signature_data,
    }).then(() => {
        response.redirect("/thank_you");
    });
});

module.exports = router;
