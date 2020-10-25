//firebase init functions
//npm install nodemailer

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {     
        user:'tennisschuletvg@gmail.com',
        pass: 'yfkkgisjyeekpven'        
    }
});


exports.submitMessage = functions.https.onCall((data, context) => {
    
    // getting dest email by query string
    const dest = data.dest;
    //console.log(`error: ${JSON.stringify(error)}`);
    //console.log('req.dest', data.dest)
  
    const mailOptions = {
        from: 'Tennisschule TVG <tennisschuletvg@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
        to: dest,
        subject: 'Neue Nachricht von TVG Webseite', // email subject
        html: `<p style="font-size: 16px;">
        Vorname: ${data.firstname} <br/>
        Nachname: ${data.lastname} <br/>
        Telefon: ${data.phone}<br/>
        E-Mail: ${data.email}<br/>
        Nachricht: ${data.comment}<br/>       
        </p> ` // email content in HTML
    };
    return new Promise(function(resolve, reject) {
     
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } 
        else {
          resolve({...info, ...data})
        } 
      });
    });
  });
  
