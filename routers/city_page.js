/** @format */
const express = require("express");
const router = express.Router();

const { getSignaturesByCity } = require("../database");
const { userLoggedOutRedirect, requireSignature } = require("../middlewear");

//city page
/*------------------------------------------------*/
router.get("/signatures/:city", (request, response) => {
    const { city } = request.params;
    console.log();
    getSignaturesByCity(city.substring(1)).then((signatures) => {
        response.render("pages/citys", { signatures });
    });
});

module.exports = router;
