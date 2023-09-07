const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const { isAccountEnabled } = require("../utils/tokenUtils");

async function login(req, res) {
    const user = req.body;
    const notEnabled = await isAccountEnabled(user);
    if (notEnabled) {
        return res.status(400).json({
            success: false,
            msg: "Login failed. User has not enable the account.",
        });
    }

    const userFromDB = await UserModel.findOne({
        where: { username: user.username },
    });
    if (userFromDB) {
        if (userFromDB.username !== user.username) {
            return res.status(400).json({
                success: false,
                msg: "Login failed. Wrong username",
            });
        }
        if (!(await bcrypt.compare(user.password, userFromDB.password))) {
            return res.status(400).json({
                success: false,
                msg: "Login failed. Wrong password",
            });
        }
    }
}
