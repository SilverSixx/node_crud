const regexMail =
    /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
const regexPhoneNumber =
    /^(?:\+84|0)(?:3[2-9]|5[2689]|7[0|6-9]|8[1-9]|9[0-9])\d{7}$/;


module.exports = { regexMail, regexPhoneNumber };
