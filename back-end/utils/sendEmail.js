

import dotenv from "dotenv";
dotenv.config();

import nodemailer from 'nodemailer'

import nodeMailerConfig  from './nodeMailerConfig.js';
const sendEmail = async({to, subject,html})=>{
try {
  
    let transporter = nodemailer.createTransport(nodeMailerConfig);

    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to,
      subject,
      html,
     
    });
    console.log("email sent succesfully ..........");
} catch (error) {
  console.log(error.message)
}
      
}   

export default sendEmail

//  html: `<h3> ${user.name} ! Thank you for registracting on our site</h3>
//         <h4>Please verify your email to continue..</h4>
//         <a href="http://${req.headers.host}/verify-email?token=${user.verificationToken}" >verify your Email</a>
//         `,