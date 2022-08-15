import React, { useState } from 'react'
import Pic from '../assets/pic1.png'
import { Stack ,Grid, TextField,Button,Typography,Box,Alert} from '@mui/material'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { getToken, storeToken } from '../services/LocalStorageToken'
const Login = () => {

const [loginstate, setLoginState] = useState({
    email:"",
    password:""
})

const navigate =useNavigate()
 const [error ,setError] = useState({
  status:false,
  property:"",
  message:""
 })

const login =(e)=>{
  setLoginState({...loginstate, [e.target.name]:e.target.value })
}


const LoginUpHandler =async (e)=>{
  e.preventDefault()


       if((loginstate.email === '') || (loginstate.password ==='') ){
         setError({
           status: true,
           property: "error",
           message: "All fiels are required",
         });
       }else{
         try {
             const res = await axios.post(
               "http://localhost:5000/api/v1/signin",
               loginstate
             );
       

         if(res.data.message ==='success')
         {
            storeToken(res.data.accessToken);
            getToken()
          setError({
            status: true,
            property: "success",
            message: "successfuly login",
          })
          setTimeout(()=>{
              navigate('/dashboard')
          },3000)

         }else{
          setError({
            status: true,
            property: "error",
            message: "Email/password  is incurrect",
          });
         }
         } catch (error) {

           setError({
             status: true,
             property: "error",
             message: "Email/password  is incurrect",
           });
         }
        
       }
     
    
     

}
  return (
    <Grid container display="flex" direction="row">
      <Grid item flexGrow={0.5}>
        <img style={{ width: "550px" }} src={Pic} alt="login imgage" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack
          sx={{
            width: "500px",

            mt: "100px",
            p: 1,
         
            boxShadow: "2px 5px 5px 2px lightgray",
          }}
        >
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Login
          </Typography>

          {error.status ? (
            <Alert severity={error.property}>{error.message}</Alert>
          ) : (
            ""
          )}
          <Stack
          sx={{mt:2}}
            spacing={2}
            component="form"
            id="myForm"
            
            onSubmit={LoginUpHandler}
          >
            <TextField
              onChange={login}
              name="email"
              variant="outlined"
              label="email"
              type="email"
            />
            <TextField
              onChange={login}
              name="password"
              variant="outlined"
              label="password"
              type="password"
            />
            <Button type="submit" variant="contained">
              Sign In
            </Button>
          </Stack>
          <Box sx={{ pl: "170px", mt:2}}>
            <Typography component={NavLink} to="/forgot-Password">
              Forgot Password ?
            </Typography>
          </Box>
          <hr />
          <Button component={NavLink} to="/register" color="secondary">
            Back To Sign up
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Login