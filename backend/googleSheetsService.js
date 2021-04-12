
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const fs = require("fs");
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];


async function readToken () {

    return new Promise((res, rej) => {

        fs.readFile('service_account_credentials.json', (err, content) => {
            if (err) return rej(err);
            // Authorize a client with credentials, then call the Google Sheets API.
            res(JSON.parse(content));
        });
    });
}
async function getAuthToken () {
    const credentials = await readToken();
    const auth = new google.auth.GoogleAuth({
        scopes: SCOPES,
        credentials
    });
    const authToken = await auth.getClient();
    return authToken;
}

async function getSpreadSheet ({ spreadsheetId, auth }) {
    const res = await sheets.spreadsheets.get({
        spreadsheetId,
        auth,
    });
    return res;
}

async function getSpreadSheetValues ({ spreadsheetId, auth, sheetName }) {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        auth,
        range: sheetName
    });
    return res;
}

async function insertSpreadSheet ({ spreadsheetId, auth , values}) {

    const request = {
        spreadsheetId: spreadsheetId,
        range: 'data!A:A',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            "majorDimension": "ROWS",
            "values": [values]
        },
        auth: auth,
    };

    const response = await sheets.spreadsheets.values.append(request);
    return response;

}



module.exports = {
    getAuthToken,
    getSpreadSheet,
    getSpreadSheetValues,
    insertSpreadSheet
}
