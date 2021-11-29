/** @format */
const express = require("express");
const router = express.Router();

const { createUser } = require("../database");
const cookieSession = require("cookie-session");
const { userLoggedInRedirect } = require("../middlewear");

router.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

// register page
/*------------------------------------------------*/
router.get("/register", userLoggedInRedirect, (request, response) => {
    response.render("pages/register");
});

router.post("/register", (request, response) => {
    const { first_name, last_name, email, password } = request.body;
    createUser({
        first_name,
        last_name,
        email,
        password,
    }).then((results) => {
        results.rows[0].id;
        request.session.user_id = results.rows[0].id;
        response.redirect("/profile");
    });
});

module.exports = router;
