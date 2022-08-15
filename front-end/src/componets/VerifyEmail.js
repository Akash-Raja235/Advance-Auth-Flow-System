import React, { useEffect, useState } from 'react'
import { Alert, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
const VerifyEmail = () => {
    
    const dataurl = useLocation()
  
     const useQuery =()=>{
      return new URLSearchParams(dataurl.search);
     }
   
   
       const nagivage = useNavigate()
      
   
    const [showError, setShowError] = useState({
      status:false,
      message:"",
      type:""

    })
    const query = useQuery()
    
  
    const verify =async()=>{

     try {
       const res = await axios.post("http://localhost:5000/api/v1/verify-email",{
         verificationToken:query.get('token'),
         email:query.get('email')
       });
       
       if(res.data.message ==="success"){
        
        setShowError({
          status: true,
          message: "Well done Email has verifield",
          type: "success",
        });
         
        setTimeout(() => {
          nagivage("/login");
        }, 3000);
      
       }else{
        setShowError({
          status: true,
          message: "Email verification failed try again",
          type: "error",
        });

       }    
       
      
       
     } catch (error) {
         
      setShowError({
        status: true,
        message: "server error",
        type: "error",
      });
     }

    }
    useEffect(() => {
      verify();
    }, []);

  return (
    <>
      {
        showError.status? <Alert severity={showError.type}>{showError.message}</Alert>:"" 
      }
    </>
  );
}

export default VerifyEmail