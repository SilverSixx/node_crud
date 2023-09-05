const repo = require("../repo/queryFuns");
const bcrypt = require("bcrypt");

const {
    generateToken,
    confirmToken,
    isAccountEnabled,
} = require("../utils/tokenUtils");
const { sendAccountCreationMail } = require("../utils/mailUtils");
const { regexMail, regexPhoneNumber } = require("../utils/userUtils");

async function register(req, res) {
    try {
        // handle when user already did register but not enable (same details but have token mapped)
        const user = req.body;
        const notEnabled = await isAccountEnabled(user);
        if (notEnabled) {
            return res.status(400).json({
                success: false,
                msg: "Registration failed. User has not enabled their account.",
            });
        }

        // validate the credentials
        if (!regexMail.test(user.username)) {
            return res.status(400).json({
                success: false,
                msg: "Registration failed. Invalid username (prompt: using your email).",
            });
        }
        const usernameExists = await repo.ExistByUsername(user.username);
        if (usernameExists) {
            return res.status(400).json({
                success: false,
                msg: "Registration failed. Username already exists.",
            });
        }

        if (!regexPhoneNumber.test(user.phoneNumber)) {
            return res.status(400).json({
                success: false,
                msg: "Registration failed. Invalid phone number.",
            });
        }
        const phoneNumberExists = await repo.ExistByPhoneNumber(
            user.phoneNumber
        );
        if (phoneNumberExists) {
            return res.status(400).json({
                success: false,
                msg: "Registration failed. Phone number already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await repo.addNewUser(user);

        const token = await generateToken(user.username);
        const link = `http://localhost:3000/api/v1/register?token=${token}`;
        await sendAccountCreationMail(link, user.username);

        return res.status(200).json({
            success: true,
            data: {
                msg: "Register new account successfully",
                user: user,
                confirm_token: token,
            },
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error during registration.",
        });
    }
}

async function enableUser(req, res) {
    try {
        const confirmationMessage = await confirmToken(req.query.token);

        if (confirmationMessage === "Successfully enable user.") {
            return res.status(200).json({
                success: true,
                msg: confirmationMessage,
            });
        } else if (
            confirmationMessage === "Token has expired, please register again."
        ) {
            return res.status(400).json({
                success: false,
                msg: confirmationMessage,
            });
        } else {
            return res.status(400).json({
                success: false,
                msg: confirmationMessage,
            });
        }
    } catch (error) {
        console.error("Error during enabling user:", error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error during enabling user.",
        });
    }
}

module.exports = { register, enableUser };
