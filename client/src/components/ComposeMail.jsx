import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  InputBase,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import emailjs from "emailjs-com";
import useApi from "../hooks/useApi";
import { API_URLS } from "../api/Api.urls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styledDialog = {
  height: "670px",
  width: "80%",
  maxHeight: "670px",
  maxWidth: "none",
  borderRadius: "15px",
  boxShadow: "none",
};

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 13,
  height: "20px",
  backgroundColor: "#b8f2e6",
  "& > p": {
    fontSize: 15,
    fontWeight: 500,
  },
});

const RecepientsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 15px",
  "& > div": {
    fontSize: 15,
    borderBottom: "3px solid #f5f5f5",
    marginTop: 5,
  },
});

const Footer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 15px",
});

const StyledButton = styled(Button)({
  borderRadius: "30px",
  width: "105px",
  height: "33px",
  fontSize: 15,
  textTransform: "none",
  background: "#00378f",
});

const ComposeMail = ({ openMail, setOpenMail }) => {
  // State to store email data
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
  });

  const sentEmailService = useApi(API_URLS.saveSentEmails);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);

  // Handle input changes
  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const sendMail = async (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: emailData.to,
      subject: emailData.subject,
      message: emailData.text,
    };

    try {
      // Send email using EmailJS
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_API_KEY
      );

      console.log("Email sent successfully");
      toast.success("Email sent successfully!");

      // Prepare the payload for the API call
      const payload = {
        to: emailData.to,
        from: process.env.REACT_APP_FROM_EMAIL,
        subject: emailData.subject,
        body: emailData.text,
        date: new Date(),
        image: "",
        name: "Uday Thakur",
        starred: false,
        type: "sent",
      };

      // Call sentEmailService to store the email
      await sentEmailService.call(payload);

      // Check for errors after the API call
      if (!sentEmailService.error) {
        // Close mail dialog and reset the email form
        setOpenMail(false);
        setEmailData({
          to: "",
          subject: "",
          text: "",
        });
      } else {
        console.error("Error saving sent email:", sentEmailService.error);
        toast.error("Failed to save the sent email");
      }
    } catch (error) {
      console.error("Failed to send email");
      toast.error("Failed to send email");
    }
  };

  const closeMail = async (e) => {
    e.preventDefault();

    const payload = {
      to: emailData.to,
      from: "udaythakur7469@gmail.com",
      subject: emailData.subject,
      body: emailData.text,
      date: new Date(),
      image: "",
      name: "Uday Thakur",
      starred: false,
      type: "drafts",
    };

    await saveDraftService.call(payload);

    if (!saveDraftService.error) {
      // Close mail dialog and reset the email form
      setOpenMail(false);
      setEmailData({
        to: "",
        subject: "",
        text: "",
      });
      console.log("Draft saved successfully");
      toast.success("Draft saved successfully");
    } else {
      console.error("Error saving draft email:", saveDraftService.error);
      toast.error("Failed to save the draft email");
    }
  };

  return (
    <Dialog
      open={openMail}
      PaperProps={{ sx: styledDialog }}
      onClose={closeMail}
    >
      <Header>
        <Typography sx={{ cursor: "pointer" }}>New Message</Typography>
        <CloseIcon onClick={(e) => closeMail(e)} sx={{ cursor: "pointer" }} />
      </Header>
      <RecepientsWrapper>
        <InputBase
          placeholder="Recipient"
          name="to"
          onChange={handleChange}
          value={emailData.to}
          variant="standard"
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={handleChange}
          value={emailData.subject}
          variant="standard"
        />
      </RecepientsWrapper>
      <TextField
        multiline
        rows={20}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        name="text"
        onChange={handleChange}
        value={emailData.text}
      />
      <Footer>
        <StyledButton variant="contained" onClick={sendMail}>
          Send
        </StyledButton>
        <DeleteOutlineOutlinedIcon
          onClick={() => setOpenMail(false)}
          sx={{ cursor: "pointer", fontSize: 20, paddingRight: 1 }}
        />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
