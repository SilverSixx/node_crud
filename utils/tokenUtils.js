const jwt = require("jsonwebtoken");
const { User, Role } = require("../model/UserDB");
const bcrypt = require("bcrypt");

const map = new Map();

const secret_key = process.env.SECRET_KEY;

async function generateConfirmToken(username) {
    const token = jwt.sign({sub:username}, secret_key, { expiresIn: "15m" });
    map.set(username, {
        token,
        expiration: Date.now() + 15 * 60 * 1000,
    });
    return token;
}

async function confirmToken(token) {
    for (const [username, tokenInfo] of map.entries()) {
        if (tokenInfo.token === token) {
            // Check if the token has expired
            if (tokenInfo.expiration > Date.now()) {
                map.delete(username);
                return "Successfully enable user."; // Token is confirmed
            } else {
                // Token has expired; remove it from the map
                map.delete(username);
                return "Token has expired, please register again."; // Token is not confirmed
            }
        }
    }
    // Token was not found in the map
    return "Token not found in database.";
}

async function isAccountEnabled(user) {
    if (map.get(user.username)) {
        const userFromDB = await User.findOne({
            where: { username: user.username },
        });
        if (
            userFromDB &&
            userFromDB.username === user.username &&
            (await bcrypt.compare(user.password, userFromDB.password)) &&
            userFromDB.fullname === user.fullname &&
            userFromDB.phoneNumber === user.phoneNumber
        ) {
            // means same but not enabled
            return true;
        } else {
            // means userFromDB null, or different user
            return false;
        }
    } else {
        // not register
        return false;
    }
}

module.exports = { generateConfirmToken, confirmToken, isAccountEnabled };
