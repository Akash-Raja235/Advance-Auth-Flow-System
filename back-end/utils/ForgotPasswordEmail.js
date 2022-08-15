import sendEmail from "./sendEmail.js"


const ForgotPasswordEmail = async({name,id,token,email})=>{

      const origin ='http://localhost:3000'
     const link = `${origin}/forgot-password-update/${id}/${token}`;
    const message=`<p>hello ${name} , This link is only valid for 15 minutes <a href="${link}">changePassword</a></p>`
    

    return sendEmail({
      to:email,
      subject: `change Password`,
      html: `${message}`,
    });
}

export default ForgotPasswordEmail