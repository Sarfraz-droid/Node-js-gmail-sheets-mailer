const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fs = require("fs");
const token = require("./token.json");
const credentials = require("./credentials.json");

const oauth2Client = new OAuth2({
    clientId: credentials.web.client_id,
    clientSecret: credentials.web.client_secret,
    redirectUri: credentials.web.redirect_uris[0]
});

async function UpdateToken(){
    oauth2Client.setCredentials({
        refresh_token: token.refresh_token
    });
    const accessToken = oauth2Client.getAccessToken();

    return new Promise((resolve,reject) => {
        token.access_token = accessToken;
        fs.writeFile("./token.json", JSON.stringify(token), function(err){
            if(err) throw err;
            console.log("Token saved");
            resolve();
        });
    })
}

async function SaveNewToken(accessToken){
    token.access_token = accessToken;

    await fs.writeFile("./token.json", JSON.stringify(token), function(err){
        if(err) throw err;
        console.log("Token saved");
    });
}

module.exports = {
    UpdateToken,
    SaveNewToken
};