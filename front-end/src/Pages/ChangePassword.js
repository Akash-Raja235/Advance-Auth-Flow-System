import React, { useState } from 'react'

import { Stack ,Grid, TextField,Button,Typography,Box,Alert} from '@mui/material'
import axios from 'axios'

import { getToken } from '../services/LocalStorageToken'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
 
const [changePasswordstate, setChangePassword] = useState({
  password: "",
  Confirm_password: "",
});

 const [error ,setError] = useState({
  status:false,
  property:"",
  message:""
 })

   const navigate= useNavigate()
 // get Token '''
 const token = getToken()
const changePasswordEvent = (e) => {
  setChangePassword({ ...changePasswordstate, [e.target.name]: e.target.value });
};


const changePasswordHandler = async (e) => {
  e.preventDefault();

  if (
    changePasswordstate.password === "" ||
    changePasswordstate.Confirm_password === ""
  ) {
    setError({
      status: true,
      property: "error",
      message: "All fields are required",
    });
    if(changePasswordstate.password !==changePasswordstate.Confirm_password){
      
        setError({
          status: true,
          property: "error",
          message: "Password does not Match",
        });
    }
  } else {

    try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/change-password",
          changePasswordstate,
            {
              headers: {
                'authorization':`Bearer ${token}`
              }
             }
          
        );

         document.getElementById("myForm").reset();
        if (res.data.message === "Password Changed Successfully") {
          setError({
            status: true,
            property: "success",
            message: "successfuly Change your password",
          });

          setTimeout(()=>{
         navigate('/login')
          },2000)
        } else {
          setError({
            status: true,
            property: "error",
            message: res.data.message,
          });
        }
          
   

    } catch (error) {
       console.log(error.message)
    }

  }

 
};
  return (
    <Grid container display="flex" direction="row">
      <Grid item flexGrow={0.5}>
        
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
            Change password?
          </Typography>

          {error.status ? (
            <Alert severity={error.property}>{error.message}</Alert>
          ) : (
            ""
          )}
          <Stack
            sx={{ mt: 2 }}
            spacing={2}
            component="form"
            id="myForm"
            onSubmit={changePasswordHandler}
          >
            <TextField
              onChange={changePasswordEvent}
              name="password"
              variant="outlined"
              label="password"
            />
            <TextField
              onChange={changePasswordEvent}
              name="Confirm_password"
              variant="outlined"
              label="password"
              type="password"
            />
            <Button type="submit" variant="contained">
              Change password
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );

}

export default ChangePassword