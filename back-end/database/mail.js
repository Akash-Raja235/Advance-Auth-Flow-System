
import nodemailer from "nodemailer"

const mailer =async(req,res)=>{

    let transporter = nodemailer.createTransport({


        service:'gmail',
        auth:{
            user:process.env.AUTH_EMAIL,
            pass:process.env.AUTH_PASS
        }
    })
    let info = transporter.sendMail({
      from: "samarjen235b",
      to :req.body.to,
      subject:req.body.subject,
      text:req.body.text
    });

}

transporter.verify((error,success)=>{
    if(error){
        console.log(error)
    }else{
        console.log(success)
    }
})