import { Box, Button, Paper, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';
import React from 'react'

const Contact = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Paper sx={{ width: "500px", p: 2, height: "500px" }}>
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Contact Me
          </Typography>
          <hr />
          <Button
            sx={{ width: "400px", bgcolor: "blue", mt: 4, color: "gray" }}
            component={NavLink}
            to=""
          >
            GitHub
          </Button>
          <Button
            sx={{ width: "400px", bgcolor: "blue", mt: 4, color: "gray" }}
            component={NavLink}
            to=""
          >
            See Other project
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default Contact