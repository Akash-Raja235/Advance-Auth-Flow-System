
import dotenv from "dotenv";
dotenv.config();
export default {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    // pass: "yramqjgzqsozsulc",
    pass:process.env.AUTH_PASS,
  },
};



