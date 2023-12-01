const nodemailer = require("nodemailer");

// genarate the OTP
// default OTP length is 6
exports.generateOTP = (otp_length = 6)=>{
    let OTP ="";
    for(let i =1; i<= otp_length; i++){
        const randomVal = Math.round(Math.random()*9);
        OTP += randomVal;
    }
    return OTP;
}

// used Mailtrap.io website
exports.generateMailTransporter =() => nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        // user and pass inside .env file
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASSWORD,

    },
});

