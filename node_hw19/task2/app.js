const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mailer = require('nodemailer');

let smtpTransport = mailer.createTransport("smtps://ndhwmailer1@gmail.com:"+encodeURIComponent('ntcnvtbkthf1') + "@smtp.gmail.com:465")

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/about', (req, res) => {
    res.redirect('/');
});

app.get('/contacts', (req, res) => {
    res.render('form.hbs');
});

app.post('/contacts', (req, res) => {
    let message = `
    <ul>
        <li>Имя: ${req.body.userName}</li>
        <li>Пароль: ${req.body.userPass}</li>
        <li>Почта: ${req.body.userEmail}</li>
    </ul>`;

    let mail = {
        from: "NodeMailer <from@gmail.com>",
        to: "tarasoniwe2011@mail.ru", // Тут надо указать почту, куда нужно отправить письмо
        subject: "Send Email Using Node.js",
        text: "Node.js New world for me",
        html: message
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close();
    });

    res.render('index.hbs');
});

app.listen(3000, () => {
    console.log('Server on localhost:3000');
});