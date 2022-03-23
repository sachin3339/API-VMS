const nodemailer = require('nodemailer')
 // create reusable transporter object using the default SMTP transport
 
 let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

module.exports={
    transporter:transporter
}