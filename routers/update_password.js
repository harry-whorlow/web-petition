/** @format */
const express = require("express");
const router = express.Router();

const { updateUserPassword } = require("../database");

const { userLoggedOutRedirect } = require("../middlewear");

// update user password
/*------------------------------------------------*/
router.get("/update_password", userLoggedOutRedirect, (request, response) => {
    response.render("pages/update_password");
});

router.post("/update_password", (request, response) => {
    const { password, check_password } = request.body;
    if (password != check_password) {
        response.render("pages/update_password", {
            error: "passwords do not match",
        });
        return;
    }
    updateUserPassword({ id: request.session.user_id, password }).then(() => {
        response.redirect("thank_you");
    });
});

module.exports = router;
