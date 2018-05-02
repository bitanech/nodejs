let mailer = require('nodemailer');

var smtpTransport = mailer.createTransport("smtps://ndhwmailer1@gmail.com:"+encodeURIComponent('ntcnvtbkthf1') + "@smtp.gmail.com:465"); 

var mail = {
    from: "NodeMailer <from@gmail.com>",
    to: "youremail@mail.ru", // Тут надо указать почту, куда нужно отправить письмо
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
});

