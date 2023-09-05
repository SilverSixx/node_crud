const mail = require('nodemailer')

const mailSender = mail.createTransport({
    service: "gmail",
    auth: {
        user: "phamluongdat231103@gmail.com",
        pass: "zoglomrhavxqzihl", // Use the app password you generated
    },
});

module.exports = { mailSender };