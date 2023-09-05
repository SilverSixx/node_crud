async function accountCreationMail(recipient, confirmLink){
        return `
        <div style="font-family: Arial, sans-serif; background-color: #f1f1f1; margin: 0; padding: 0; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #007bff; margin-bottom: 20px;">ACCOUNT CREATED SUCCESSFULLY</h1>
            <p style="margin-bottom: 10px;">Dear ${recipient},</p>
            <p style="margin-bottom: 10px;">Thank you for choosing our service. Please click the button below to confirm your email address:</p>
            <p style="margin-bottom: 10px;">
                <a href="${confirmLink}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm</a>
            </p>
            <p style="margin-bottom: 10px;">Best regards,</p>
            <p style="margin-bottom: 10px;">LDeBanking Team</p>
        </div>
        <style>
            @media only screen and (max-width: 600px) {
                .container {
                    max-width: 100% !important;
                    padding: 10px !important;
                }
                h1 {
                    font-size: 24px !important;
                }
                .button {
                    padding: 8px 16px !important;
                }
            }
        </style>
    `;
}

module.exports = { accountCreationMail };