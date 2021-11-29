/** @format */
const express = require("express");
const router = express.Router();

const { getProfile, updateUser, updateUserProfile } = require("../database");

const { userLoggedOutRedirect } = require("../middlewear");

router.get("/update_profile", userLoggedOutRedirect, (request, response) => {
    getProfile(request.session.user_id).then((profile) => {
        response.render("pages/update_profile", profile);
    });
});

router.post("/update_profile", (request, response) => {
    const { first_name, last_name, email, age, city, homepage } = request.body;
    Promise.all([
        updateUser({
            id: request.session.user_id,
            first_name,
            last_name,
            email,
        }),
        updateUserProfile({
            user_id: request.session.user_id,
            age,
            city,
            homepage,
        }),
    ]).then(() => {
        response.redirect("/thank_you");
    });
});

module.exports = router;
