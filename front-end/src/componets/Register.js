import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import { TextField,Button, Grid,Typography ,Alert} from '@mui/material'
import { NavLink,useNavigate } from 'react-router-dom';
import Pic from "../assets/pic1.png";
import axios from 'axios'
const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    status: false,
    property: "",
    message: "",
  });

   const navigate= useNavigate()

  const signUp = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  
  const signhUpHandler = async (e) => {
    e.preventDefault();

    if (
      register.name === "" ||
      register.email === "" ||
      register.password === ""
    ) {
      setError({
        status: true,
        property: "error",
        message: "All fiels are required",
      });
    } else {
      try {
          const res = await axios.post(
            "http://localhost:5000/api/v1/signup",
            register
          );

          
         
           setError({
             status: true,
             property: "success",
             message: "Verify your Email",
           });

           document.getElementById("myForm").reset();

      } catch (error) {
           console.log(error.message)
      }

    
     
      // navigate('/login')
    }

   
  };
  return (
    <>
      <Grid container>
        <Grid item>
          <img style={{ width: "550px" }} src={Pic} alt="login imgage" />
        </Grid>
        <Grid item>
          <Stack
            spacing={2}
            sx={{
              width: "500px",
              mt: "100px",
              p: 2,
              boxShadow: "2px 5px 5px 2px lightgray",
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h5">
              Register ?
            </Typography>
            {error.status ? (
              <Alert severity={error.property}>{error.message}</Alert>
            ) : (
              ""
            )}
            <Stack
              spacing={2}
              component="form"
              id="myForm"
              onSubmit={signhUpHandler}
            >
              <TextField
                onChange={signUp}
                name="name"
                variant="outlined"
                label="name"
                type="name"
              />
              <TextField
                onChange={signUp}
                name="email"
                variant="outlined"
                label="email"
                type="email"
              />
              <TextField
                onChange={signUp}
                name="password"
                variant="outlined"
                label="password"
                type="password"
              />
              <Button type="submit" variant="contained">
                Sign Up
              </Button>
            </Stack>
            <Button component={NavLink} to="/login" color="secondary">
              Back To Sign In
            </Button>
          </Stack>
        </Grid>     
      </Grid>
    </>
  );
}

export default Register