/** @format */

// database constants setup
const bcrypt = require("bcryptjs");
const spicedPg = require("spiced-pg");
const db = spicedPg(getDatabaseURL());

function getDatabaseURL() {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    const { db_user, db_key, db_name } = require("./secrets.json");
    return `postgres:${db_user}:${db_key}@localhost:5432/${db_name}`;
}

/*------------------------------------------------*/
// create signiture function
function createSignature({ user_id, api_key, signature_data }) {
    return db
        .query(
            `INSERT INTO signatures (user_id, api_key, signature_data )
        VALUES ($1, $2, $3)
        RETURNING *`,
            [user_id, api_key, signature_data]
        )
        .then((results) => results.rows[0]);
}

// create user function
function createUser({ first_name, last_name, email, password }) {
    return hash(password).then((password_hash) => {
        return db
            .query(
                `INSERT INTO users (first_name, last_name, email, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
                [first_name, last_name, email, password_hash]
            )
            .catch((error) => {
                console.log(error);
            });
    });
}

//create profile function
function createProfile({ user_id, age, city, homepage }) {
    return db
        .query(
            `INSERT INTO user_profiles (user_id, age, city, homepage) VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, age, city, homepage]
        )
        .then((results) => results.rows[0]);
}

// update user info

function updateUser({ id, first_name, last_name, email }) {
    return db.query(
        `UPDATE users
            SET first_name = $2, last_name = $3, email = $4
            WHERE id = $1`,
        [id, first_name, last_name, email]
    );
}

function updateUserProfile({ user_id, age, city, homepage }) {
    return db
        .query(
            `
    INSERT INTO user_profiles (user_id, age, city, homepage)
    VALUES($1, $2, $3, $4)
    ON CONFLICT (user_id)
    DO UPDATE SET age= $2, city = $3, homepage = $4;`,
            [user_id, age, city, homepage]
        )
        .then((results) => results.rows[0]);
}

function updateUserPassword({ id, password }) {
    return hash(password).then((password_hash) => {
        return db.query(
            `
        UPDATE users
        SET password_hash = $2
        WHERE id = $1`,
            [id, password_hash]
        );
    });
}

function deleteSignature(user_id) {
    return db.query(`DELETE FROM signatures WHERE user_id = $1;`, [user_id]);
}

/*------------------------------------------------*/

// query user profile

function getProfile(user_id) {
    return db
        .query(
            `
    SELECT users.*, user_profiles.* 
    FROM users FULL JOIN user_profiles
    ON users.id = user_profiles.user_id
    WHERE users.id = $1`,
            [user_id]
        )
        .then((result) => result.rows[0]);
}

// query user by email
function getUserByEmail(email) {
    return db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((result) => result.rows[0]);
}

// query signtures function
function getSignatures() {
    return db
        .query(
            `
    SELECT users.first_name, users.last_name,
    user_profiles.age,
    user_profiles.city,
    user_profiles.homepage
    FROM users
    FULL JOIN user_profiles
    ON users.id = user_profiles.user_id
    JOIN signatures
    ON users.id = signatures.user_id;`
        )
        .then((result) => result.rows);
}

//query signature by id
function getSignatureByUserId(user_id) {
    return db
        .query("SELECT * FROM signatures WHERE user_id = $1", [user_id])
        .then((result) => result.rows[0]);
}

function getSignaturesByCity(city) {
    return db
        .query(
            `
    SELECT users.first_name, users.last_name,
    user_profiles.age,
    user_profiles.city,
    user_profiles.homepage
    FROM users
    FULL JOIN user_profiles
    ON users.id = user_profiles.user_id
    JOIN signatures
    ON users.id = signatures.user_id
    WHERE user_profiles.city ILIKE $1;`,
            [city]
        )
        .then((result) => result.rows);
}

// query id count
function getCount() {
    return db
        .query("SELECT COUNT(id) FROM signatures")
        .then((result) => result.rows[0].count);
}

/*------------------------------------------------*/

// hashing
function hash(password) {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
}

/*------------------------------------------------*/

// check login function
function checkLogin({ email, password }) {
    return getUserByEmail(email).then((foundUser) => {
        if (!foundUser) {
            return null;
        }

        return bcrypt
            .compare(password, foundUser.password_hash)
            .then((match) => {
                if (match) {
                    return foundUser;
                }
                return null;
            });
    });
}

/*------------------------------------------------*/

function test() {
    console.log("test");
}

// module export
module.exports = {
    createSignature,
    createProfile,
    createUser,
    checkLogin,
    getSignatureByUserId,
    getSignatures,
    getCount,
    getSignaturesByCity,
    getProfile,
    updateUser,
    updateUserProfile,
    updateUserPassword,
    test,
    deleteSignature,
};
