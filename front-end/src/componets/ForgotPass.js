import { Stack, TextField,Button, Paper, Alert } from "@mui/material"
import axios from "axios"
import { useState } from "react"
const ForgotPass = () => {
     
    const [forgotstate, setForgotsate] = useState({
        email:""
    })

   

    const [error, setError] = useState({
      status: false,
      property: "",
      message: "",
    });

      
    
    const forgetevent =(e)=>{
        setForgotsate({... forgotstate,[e.target.name]:e.target.value})
      
    }

    const forgotPassHandler =async (e)=>{
       
        e.preventDefault()
        if(forgotstate.email===''){
         setError({
            status:true,
           property: "error",
           message: "Email is required",
          
         });
          
        }else{
          
              try {
                const res = await axios.post(
                  "http://localhost:5000/api/v1/forgot-password",
                  forgotstate
                );
               
             setError({
               status: true,
               property: "success",
               message: "Email has been sent",
             });

             document.getElementById("myForm").reset();
              } catch (error) {
                console.log(error.message);
              }
          
       
            
        }
    }
   
  return (
    <>
      <Stack
        id="myForm"
        onSubmit={forgotPassHandler}
        component="form"
        spacing={2}
        sx={{ width: "500px", ml: "600px", mt: 10 }}
      >
        <TextField
          onChange={forgetevent}
          name="email"
          placeholder="Email"
          variant="outlined"
          type="email"
        />
        <Button type="submit" variant="contained">
          Send Email
        </Button>
        {error.status ? (
          <Alert severity={error.property}>{error.message}</Alert>
        ) : (
          ""
        )}
      </Stack>
    </>
  );
}

export default ForgotPass
