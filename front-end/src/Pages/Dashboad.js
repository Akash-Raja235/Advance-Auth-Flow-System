import { Avatar, Button, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getToken, removeToken } from '../services/LocalStorageToken'
const Dashboad = () => {
  const [showmeSate,setShowmeState] = useState(false)

  const [getUserData,setgetUserData] = useState({
    name:"",
    email:""
  })
  const navigate= useNavigate()
    const logoutHandler=()=>{
      removeToken('token')
      navigate('/')
    }
    
    const token = getToken()
     const getDataFromServer = async()=>{
       
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/logged-user",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setgetUserData({
        name:data.user.name,
        email:data.user.email
      })
     }
       
      useEffect(()=>{
      getDataFromServer()
      
      },[])
         
       
    const showMe =()=>{
      setShowmeState(!showmeSate);
    }
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ bgcolor: "lightblue", height: "70px" }}
      >
        <Grid item sx={{ ml: 2 }}>
          <Typography variant="h5"> Dashboad Area</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} sx={{ mr: 3 }}>
            <Button
              variant="contained"
              onClick={logoutHandler}
              color="secondary"
            >
              Log Out
            </Button>
            <Button
              variant="contained"
              component={NavLink}
              to="/dashboard/change-Password "
              color="secondary"
            >
              Change Password
            </Button>
            <IconButton onClick={showMe}>
              <Avatar src="" />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
        open={showmeSate}
        onClose={() => setShowmeState(false)}
      >
        <Avatar sx={{ m: 2 }} src="" />
        <Typography sx={{ p: 2 }} variant="subtitle">
          {getUserData.name}
        </Typography>
        <Typography sx={{ pl: 2, pr: 2 }} variant="subtitle">
          {getUserData.email}
        </Typography>
      </Drawer>
    </>
  );
}

export default Dashboad