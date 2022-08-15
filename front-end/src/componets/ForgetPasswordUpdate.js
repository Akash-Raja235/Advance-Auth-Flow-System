import React, { useState } from 'react'

import { Stack ,Grid, TextField,Button,Typography,Box,Alert} from '@mui/material'
import axios from 'axios'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const ForgetPasswordUpdate = () => {


    // const urldata = useLocation();
    // const usequery = () => {
    //   return new URLSearchParams(urldata.search);
    // };

    // const query = usequery();
    const navigate = useNavigate()

      const {id,token} =useParams()

    const [changePassworUpdatedstate, setChangePassworUpdatedstate] = useState(
      {
        password: "",
        Confirm_password: "",
      }
    );

    const [error, setError] = useState({
      status: false,
      property: "",
      message: "",
    });
   

    const changePassworUpdatedEvent = (e) => {
      setChangePassworUpdatedstate({
        ...changePassworUpdatedstate,
        [e.target.name]: e.target.value,
      });
    };

    const changePassworUpdatedHandler = async (e) => {
      e.preventDefault();

      if (
        changePassworUpdatedstate.password === "" ||
        changePassworUpdatedstate.Confirm_password === ""
      ) {
        setError({
          status: true,
          property: "error",
          message: "All fiels are required",
        });

        if(changePassworUpdatedstate.password !== changePassworUpdatedstate.Confirm_password){
             setError({
               status: true,
               property: "error",
               message: "Password & confirm password not match",
             });
        }
      } else {
         
        
        try {
            const res = await axios.post(
              `http://localhost:5000/api/v1/forgot-password-change/${id}/${token}`,

              {
                password: changePassworUpdatedstate.password,
                Confirm_password:changePassworUpdatedstate.Confirm_password,
                // id: query.get("id"),
                // token: query.get("token"),
              }
            );

            
            if (res.data.message === "password has updated") {
              setError({
                status: true,
                property: "success",
                message: "successfuly Change your password",
              });

              setTimeout(()=>{
                navigate('/login')
              },3000)
            } else {
              setError({
                status: true,
                property: "error",
                message: "Token has expired",
              });
            }
             


        } catch (error) {
           console.log(error.message)
        }
    
    
    }

     
}


  return (
    <>
      <Grid container display="flex" direction="row">
        <Grid item flexGrow={0.5}></Grid>
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
             Reset Password
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
              onSubmit={changePassworUpdatedHandler}
            >
              <TextField
                onChange={changePassworUpdatedEvent}
                name="password"
                variant="outlined"
                label="password"
              />
              <TextField
                onChange={changePassworUpdatedEvent}
                name="Confirm_password"
                variant="outlined"
                label="password"
                type="password"
              />
              <Button type="submit" variant="contained">
                Reset Password
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default ForgetPasswordUpdate