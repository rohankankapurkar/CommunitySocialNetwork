/**
 * Created by rohankankapurkar on 5/14/17.
 */
var nodemailer = require("nodemailer");

exports.sendMail = function (req, res) {

    console.log(req.session.email[0].email+ "I am inside sending mail");
    console.log("printing to"+req.param("to"));
    console.log("printing from"+req.param("message"));



// Use Smtp Protocol to send Email
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "cmpe277slash@gmail.com",
            pass: "rohankankapurkar"
        }
    });


    var mailOptions={
        to : req.param("to"),
        subject : 'You have got new mail from '+req.session.email[0].email ,
        text : 'Hey neighbor '+ req.param("message")
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });


}
