const { OAuth2Client } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const sheets_data = require('./sheets_data.json');

const credentials = require('./credentials.json').web;
const token = require('./token.json');
// Initialize the OAuth2Client with your app's oauth credentials
const oauthClient = new OAuth2Client({
    clientId: credentials.client_id,
    clientSecret: credentials.client_secret
});

oauthClient.credentials.access_token = token.access_token;
oauthClient.credentials.refresh_token = token.refresh_token;
oauthClient.credentials.expiry_date = token.expiry_date; // Unix epoch milliseconds




async function NewslatterAdd(name,email){
    console.log("Adding Newsletter");
    oauthClient.on('tokens', credentials => {
        console.log(credentials.access_token);
        console.log(credentials.scope);
        console.log(credentials.expiry_date);
        console.log(credentials.token_type); // will always be 'Bearer'
    });

    const doc = new GoogleSpreadsheet(sheets_data["newsletter-id"]);
    await doc.useOAuth2Client(oauthClient);

    await doc.loadInfo();
    console.log("Document Loaded");
    const sheet1 = doc.sheetsByIndex[0];
    const row = {
        name: name,
        email: email
    };

    return new Promise(async (resolve,reject) => {
        try {
            const result = await sheet1.addRow(row);
            console.log("Added to Sheets");
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });

}

module.exports = {
    NewslatterAdd
}