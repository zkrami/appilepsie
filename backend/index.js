const express = require('express')
const app = express()
const port = 3030
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')
var cors = require('cors')
// parse application/json
app.use(bodyParser.json());


app.use(cors())
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    secure: false,
    auth: {
        user: 'fd0750a6bff027bd30b12e1717bff7ad',
        pass: '3cd09301a72e6b14fa12e77b16f258d0',
    },
});
async function sendMail (user, emails, location, time) {


    let message = user + " has fallen in this location " + location + " at " + time;

    let info = await transporter.sendMail({
        from: '"Appilepsie" <17zrami@gmail.com>', // sender address
        to: emails.join(","),
        subject: "Urgent",
        text: message, // plain text body
        html: `<b>${message}</b>`, // html body
    });
    console.log(info);

}



const {
    getAuthToken,
    insertSpreadSheet
} = require('./googleSheetsService.js');

const spreadsheetId = '1I7W-Fo4P2LnWUysDLfkXlAUoMdZo4GruNYtqzOlcYpI';
const sheetName = 'data';

async function saveInSpreadSheet (values) {
    try {
        const auth = await getAuthToken();
        const response = await insertSpreadSheet({
            spreadsheetId,
            sheetName,
            auth,
            values
        })
        console.log('output for getSpreadSheetValues', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.log(error.message, error.stack);
    }
}

app.post('/', (req, res) => {
    /*
    {
  position: { lat: 48.9335, lon: 2.3661 },
  time: 1618229334932,
  user: '17zrami@gmail.com',
  notify: [ { name: 'Rami', email: '17zrami@gmail.co' } ]
}
*/
    let time = new Date(req.body.time);
    let location = req.body.position.lat + "," + req.body.position.lon;
    let contacts = req.body.notify.map(e => e.email);
    let user = req.body.user;
    sendMail(user, contacts, location, time.toString());
    saveInSpreadSheet([user, time.toString(), location])

    res.send('OK!');
})

app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`)
})

