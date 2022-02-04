const express = require('express');
const Token = require('./GetToken');
const Mailer = require('./Mailer');
const UpdateToken = require('./UpdateToken');
const GoogleSheets = require('./GoogleSheets');

const app = express();
app.use(express.json());


const {google} = require('googleapis');
const credentials = require('./credentials.json');

// // Token.runAuth();
// Mailer.sendMail().then(() => {
//     console.log('Mail sent');
// }).catch(err => {
//     console.log(err);
// });

const PORT = 3000;

app.get('/',(req,res)=>{

})



app.post('/newsletter/add',async (req,res) => {
    await UpdateToken.UpdateToken();
    console.log('Token Updated');
    const {name,email} = req.body;
    try {
        await GoogleSheets.NewslatterAdd(name, email);
        console.log('Newslatter Added to Excel');
        await Mailer.sendMail(name,email);
        console.log('Mail sent');
        res.send('Success');
    } catch (err) {
        console.log(err);
        res.send('Error');
    }

});

app.get('/callback',(req,res)=>{
    res.json(req.query);
})

app.listen(PORT,(req,res) => {
    console.log(`Listening index.js on Port ${PORT}`);
});