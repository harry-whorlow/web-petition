/** @format */
const express = require("express");
const router = express.Router();

const {
    getSignatureByUserId,
    getCount,
    deleteSignature,
} = require("../database");

const { userLoggedOutRedirect, requireSignature } = require("../middlewear");

// thank you page
/*------------------------------------------------*/
router.get(
    "/thank_you",
    userLoggedOutRedirect,
    requireSignature,
    (request, response) => {
        const { user_id } = request.session;
        getSignatureByUserId(user_id).then((signature) => {
            getCount().then((signaturesNumber) => {
                response.render("pages/thank_you", {
                    signaturesNumber,
                    signature,
                });
            });
        });
    }
);

router.post("/thank_you", (request, response) => {
    const user_id = request.session.user_id;
    deleteSignature(user_id).then(() => {
        response.redirect("/petition");
    });
});

module.exports = router;
