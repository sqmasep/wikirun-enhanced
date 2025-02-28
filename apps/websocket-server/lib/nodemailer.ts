import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "",
    pass: "",
  },
});
