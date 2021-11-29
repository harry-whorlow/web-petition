/** @format */
const express = require("express");
const router = express.Router();

const { checkLogin } = require("../database");
const cookieSession = require("cookie-session");
const { userLoggedInRedirect } = require("../middlewear");

router.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

// login page
/*------------------------------------------------*/
router.get("/login", userLoggedInRedirect, (request, response) => {
    response.render("pages/login");
});

router.post("/login", (request, response) => {
    const { email, password } = request.body;
    checkLogin({ email, password }).then((user) => {
        if (!user) {
            response.render("pages/login", { error: "wrong credentials" });
            return;
        }
        request.session.user_id = user.id;
        response.redirect("/thank_you");
    });
});

module.exports = router;
