var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'luisvar2703@gmail.com',
    pass: 'hurgcppkjtxbsxuc'
  }
});

const sendMail = (from, to, subject) => {
    console.log("Sending Email to: " + to);
    transporter.sendMail(
        {
            from: from,
            to: to,
            subject: subject,
            text: 'Prueba mandando correo desde la aplicacion'
        }
        , (error, info)=> {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
    });
    
}

module.exports = {sendMail}