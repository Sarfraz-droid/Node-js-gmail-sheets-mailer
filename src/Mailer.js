const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fs = require("fs");
const token = require("./token.json");
const credentials = require("./credentials.json");

async function sendMail(name, email){
    const accessToken = token.access_token;
    const smtpTransport = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "alamsarfraz422@gmail.com",
            clientId: credentials.web.client_id,
            clientSecret: credentials.web.client_secret,
            refreshToken: token.refresh_token,
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: "alamsarfraz422@gmail.com",
        to: email,
        subject: `${name} added to our Newsletter`,
        generateTextFromHTML: true,
        html: "<b>Congrats, You have been added to our newsletter</b>"
    };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await smtpTransport.sendMail(mailOptions);
            console.log("Message sent: %s", res.messageId);
            resolve(res);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });


}


module.exports = {
    sendMail
};