
 import { Stack, Typography,Box } from '@mui/material'
import { display, height } from '@mui/system';
import { NavLink, Outlet } from 'react-router-dom';
import { Button } from "@mui/material";

 
 


const Navbar = () => {

 
  return (
    <>
      <Box
        sx={{
          boxShadow: "0px 2px 2px 0px lightgray",
          bgcolor: "lightblue",
          height: "40px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack sx={{ ml: 2 }}>
            <Typography sx={{ fontFamily:"monospace", fontSize:"30px", ml:5, fontWeight:"bold"}}>Advance Auth</Typography>
          </Stack>

          <Stack
            sx={{ mr: 5, display: "flex", alignItems: "center" }}
            spacing={2}
            direction="row"
            justifyContent="flex-end"
          >
            <Button  component={NavLink} to="/">
              Home
            </Button>


            
                 <Button component={NavLink} to="/register">
              Sign Up
            </Button>
            <Button component={NavLink} to="/login">
              Sign In
            </Button>
            
           
            <Button component={NavLink} to="/contact">
              Contact
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </>
  );
}

export default Navbar