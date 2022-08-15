import NotFound from "./NotFound";
import Navbar from "../componets/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../componets/Register";
import Contact from "../componets/Contact";
import Login from "../componets/Login";
import Home from "../componets/Home";
import ForgotPass from "../componets/ForgotPass";
import ChangePassword from "./ChangePassword";
import VerifyEmail from "../componets/VerifyEmail";
import Dashboad from "./Dashboad";
import ForgetPasswordUpdate from "../componets/ForgetPasswordUpdate";

import { getToken } from "../services/LocalStorageToken";
const Layout = () => {
   const token = getToken();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />

            <Route path="login" element={<Login />} />
            <Route path="contact" element={<Contact />} />
            <Route path="forgot-Password" element={<ForgotPass />} />
            <Route path="/forgot-password-update/:id/:token" element={<ForgetPasswordUpdate/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/user/verify-email" element={<VerifyEmail />} />
         
        {token?<>
           <Route path="/dashboard" element={<Dashboad />} />
          <Route
            path="/dashboard/change-Password"
            element={<ChangePassword />}
          />
        </>: ''
        }

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Layout