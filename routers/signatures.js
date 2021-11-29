/** @format */
const express = require("express");
const router = express.Router();

const { getSignatures } = require("../database");
const { userLoggedOutRedirect, requireSignature } = require("../middlewear");

//signatures page
/*------------------------------------------------*/
router.get(
    "/signatures",
    userLoggedOutRedirect,
    requireSignature,
    (request, response) => {
        getSignatures().then((signatures) => {
            response.render("pages/signatures", { signatures });
        });
    }
);

module.exports = router;
