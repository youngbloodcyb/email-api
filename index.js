const express = require('express');
const app = express();
const port = 8000;

const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config()

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.KEY
    }
});

async function run(recipient, subject, text, html="") {
    let sendResult = await smtpTransport.sendMail({
        from: process.env.EMAIL,    // sender address
        to: recipient, // list of receivers
        subject: subject, // Subject line
        text: text, // plaintext body
        html: html // html body
    });

    console.log(sendResult);
}

app.get('/send', (req, res) => {
    const recipient = req.query.recipient;
    const subject = req.query.subject;
    const text = req.query.text;
    const html = req.query.html;
    res.send('success');
    run(recipient, subject, text, html).catch(err => console.log(err));
});

app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});
