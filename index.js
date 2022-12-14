const express = require('express');
const app = express();

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

async function run(recipient, subject, text, html="", res) {
    let sendResult = await smtpTransport.sendMail({
        from: process.env.EMAIL,    // sender address
        to: recipient, // list of receivers
        subject: subject, // Subject line
        text: text, // plaintext body
        html: html // html body
    });

    console.log(sendResult);
    res.send('success');
}

app.get('/send', (req, res) => {
    const recipient = req.query.recipient;
    const subject = req.query.subject;
    const text = req.query.text;
    const html = req.query.html;
    run(recipient, subject, text, html, res).catch(err => {
        console.log(err);
        res.send("error");
    });
    // res.send('success');
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running');
});
