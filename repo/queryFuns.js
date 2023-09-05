const repo = require("./repo");

async function ExistByUsername(username) {
    try {
        const query = `
            SELECT COUNT(*) as usernameCount
            FROM users
            WHERE username = ?`;
        const result = await repo.query(query, [username]);

        if (result && result[0].usernameCount > 0) {
            return true; // User with the specified username exists
        }
        return false; // User with the specified username does not exist
    } catch (error) {
        throw new Error("Error checking user existence: " + error.message);
    }
}

async function ExistByPhoneNumber(phoneNumber) {
    try {
        const query = `
            SELECT COUNT(*) as phoneCount
            FROM users
            WHERE phoneNumber = ?`;
        const result = await repo.query(query, [phoneNumber]);

        if (result && result[0].phoneCount > 0) {
            return true; // User with the specified phome exists
        }
        return false; // User with the specified phone does not exist
    } catch (error) {
        throw new Error("Error checking user existence: " + error.message);
    }
}

async function addNewUser(newUser) {
    try {
        const query = `
            INSERT INTO users 
            (username, password, fullname, phoneNumber) 
            VALUES(?, ? , ? , ?) `;
        await repo.query(query, [
            newUser.username,
            newUser.password,
            newUser.fullname,
            newUser.phoneNumber,
        ]);
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            throw new Error("Username already exists.");
        } else {
            throw new Error("Error adding new user: " + error.message);
        }
    }
}

async function findUserByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const [user] = await repo.query(query, [username]);
    if (!user) return null;
    return user;
}

module.exports = {
    ExistByUsername,
    ExistByPhoneNumber,
    addNewUser,
    findUserByUsername,
};
