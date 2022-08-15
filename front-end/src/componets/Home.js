import { Grid, Typography } from '@mui/material'
import React from 'react'
import pic2 from '../assets/pic2.png'
const Home = () => {
  return (
    <>
      <Grid container>
        <Grid item flexGrow={0.5}>
          <img style={{width:'500px'}} src={pic2} alt="home image" />
        </Grid>
        <Grid item flexGrow={0.5}>
          <Typography sx={{mt:20}} variant='h2' color="lightgray">Advance Auth Flow</Typography>
          <Typography sx={{mt:1, pl:10, fontWeight:"light"}} variant='h6' > -Developed by Akash Raja</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Home