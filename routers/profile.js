/** @format */
const express = require("express");
const router = express.Router();

const { createProfile } = require("../database");

const { userLoggedOutRedirect } = require("../middlewear");

router.get("/profile", userLoggedOutRedirect, (request, response) => {
    response.render("pages/profile");
});

router.post("/profile", (request, response) => {
    const { age, city, homepage } = request.body;
    createProfile({
        user_id: request.session.user_id,
        age,
        city,
        homepage,
    }).then(() => {
        response.redirect("/thank_you");
    });
});

module.exports = router;
