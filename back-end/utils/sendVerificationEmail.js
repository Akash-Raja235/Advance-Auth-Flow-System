import sendEmail from "./sendEmail.js";


const sendVerificationEmail = async({name,email,verificationToken,origin})=>{

    const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
    const message = `<p>please confirm your email to click following link: <a href="${verifyEmail}" >verify email</a></p>`;
return sendEmail({to:email,subject:'email verification',html:`<h4>hello ${name}</h4>
${message}
`})

}

export default sendVerificationEmail