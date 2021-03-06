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
        user: 'zootest.projekt@gmail.com',
        pass: '#ZooTestProjekt2020'
    }
});

    exports.sendMail = functions.https.onCall((data, res) => {
        
            // getting dolaznaAdresa email by query string
            const dolaznaAdresa = data.mail;
            const naslovEmaila = data.naslovEmaila
            const porukaEmaila = data.porukaEmaila

            const mailOptions = {
                from: 'zootest.projekt@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
                to: dolaznaAdresa,
                subject: naslovEmaila, // email naslovEmaila
                text: porukaEmaila // email content in HTML
            };
    
            // returning result
            return transporter.sendMail(mailOptions, (erro) => {
                if(erro){
                    return res.send(erro.toString());
                }
                console.log(res.send('Poslano'))
                
            });            
    });

    exports.createUser = functions.https.onCall((data, res) => {
        admin.auth().createUser({
            email: data.email,
            emailVerified: true,
            password: data.password,
          }).then(() =>{
            console.log(res)
          })
          
    });

    exports.deleteUser = functions.https.onCall((data, res) => {
        admin.auth().getUserByEmail(data.email)
        .then(function(userRecord) {
            admin.auth().deleteUser(userRecord.uid)
            console.log(res)
          })
          
    });