import nodemailer from "nodemailer";
require('dotenv').config()
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(process.env.clientID, process.env.clientSecret);
OAuth2_client.setCredentials({ refresh_token: process.env.refreshToken });

export async function Boocked_mail(recipient) {
  try {
    const accessToken = await OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.user,
        clientId: process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.user,
      to: recipient,
      subject: "Appointment has Boock",
      text: `Your Appontment has been boock`,
    };

     transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function appt_Updated(recipient) {
  try {
    const accessToken = await OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.user,
        clientId: process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.user,
      to: recipient,
      subject: "Appointment update",
      text: `Your Appontment has been update`,
    };

    transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
 
export async function appt_cancelled(recipient) {
  try {
    const accessToken = await OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.user,
        clientId: process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.user,
      to: recipient,
      subject: "Appointment Cancelled",
      text: `Your Appontment has been Cancelled`,
    };

    transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function login_mail(recipient,token,otp) {
  try {
    const accessToken = await OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.user,
        clientId: process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.user,
      to: recipient,
      subject: "login success",
      text: `TOKEN : ${token}  OTP : ${otp}`,
    };

     transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function patientupcoming_appt(recipient) {
  try {
    const accessToken = await OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.user,
        clientId: process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.user,
      to: recipient,
      subject: "upcoming appointment",
      text: `your appointments is upcoming`,
    };

     transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function doctorApptUpcoming(recipient) {
  try {
    const accessToken = await OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.user,
        clientId: process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.user,
      to: recipient,
      subject: "upcoming appointment",
      text: `your appointments is upcoming`,
    };

     transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function forgot_Password(recipient,info) {
  try {
    const accessToken = await OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.user,
        clientId: process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.user,
      to: recipient,
      subject: "forgot Password",
      text: `click to reset passwore`,
      html:`token : ${info}`,
    };

    transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function reset_Password(recipient,info) {
  try {
    const accessToken = await OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.user,
        clientId: process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.user,
      to: recipient,
      subject: "reset Password",
      text: `resetPassword SuccessFully`,
      html:`your password changed succless Mr.${info}`,
    };

     transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
