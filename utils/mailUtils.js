const { mailSender } = require("../mail/mailProperites");
const { accountCreationMail } = require("../mail/mailContent");

const from = "phamluongdat231103@gmail.com";

const mailOptions = {
    from: from,
    to: "",
    subject: "",
    html: "",
    headers: {
        "Content-Type": "text/html",
    },
};

async function sendAccountCreationMail(link, recepient) {
    mailOptions.to = recepient;
    mailOptions.subject = "ACCOUNT CREATION";
    const mailContent = await accountCreationMail(recepient, link);
    mailOptions.html = mailContent;
    mailSender.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}
module.exports = { sendAccountCreationMail, }