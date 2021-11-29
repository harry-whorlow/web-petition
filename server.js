/** @format */

// constants setup
const express = require("express");
const hb = require("express-handlebars");
const path = require("path");
const cookieSession = require("cookie-session");
const { userLoggedOutRedirect } = require("./middlewear");

const app = express();
// const router = express.Router();

// view engine setup
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

// server static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/assets")));

// calls server middlewear
app.use(
    express.urlencoded({
        extended: true,
    })
);

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

// cookies stuff
app.use(
    cookieSession({
        secret: `Weaponise the Ravioli deploy the Pasta`,
        maxAge: 1000 * 60 * 60 * 24 * 28,
    })
);

// routing exports
const city_page = require("./routers/city_page");
const login = require("./routers/login");
const petition = require("./routers/petition");
const profile = require("./routers/profile");
const register = require("./routers/register");
const signatures = require("./routers/signatures");
const thank_you = require("./routers/thank_you");
const update_password = require("./routers/update_password");
const update_profile = require("./routers/update_profile");

app.use(
    city_page,
    login,
    petition,
    profile,
    register,
    signatures,
    thank_you,
    update_profile,
    update_password
);

// routing
// welcome page
/*------------------------------------------------*/

app.get("/", (request, response) => {
    response.render("pages/home");
});

app.post("/logout", userLoggedOutRedirect, (request, response) => {
    request.session.user_id = null;
    return response.redirect("/login");
});

// server porting
/*------------------------------------------------*/
const port = 5000;
app.listen(process.env.PORT || port, () => {
    console.log(`Listening on port [${port}]`);
});
