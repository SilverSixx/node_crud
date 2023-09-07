const mail = require('nodemailer')

const mailSender = mail.createTransport({
    service: process.env.MAIL_APP,
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASSWORD, // Use the app password you generated
    },
});

module.exports = { mailSender };