import React from 'react'
import { Box, Typography, Checkbox, styled } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/routes';
import useApi from '../hooks/useApi';
import { API_URLS } from '../api/Api.urls';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const ParentWrapper = styled(Box)({
  padding: '0 0 0 10px',
  background: '#e0f6fa',
  display : 'flex',
  alignItems : 'center',
  cursor: 'pointer',
  '& > div': {
    display: 'flex',
    width: '100%',
    '& > div > p': {
      fontSize: '10px'
    }
  },
  minWidth : '40px'
});

const EmailTag = styled(Typography) ({
  fontSize: '10px !important',
  background: '#ddd',
  color: '#222',
  borderRadius: '4px',
  marginRight: '6px',
  padding: '0 2px',
  display : 'flex',
  alignItems : 'center'
})

const Date = styled(Typography) ({
  marginLeft : 'auto',
  MarginRight : 20,
  fontSize : '10px',
  color: '#5F6368',
  display : 'flex',
  alignItems : 'center'
})



const Email = ({ email, selectedEmails, setSelectedEmails, setStarredEmail, setRefreshEmails}) => {

  const starredEmailsService = useApi(API_URLS.toggleStarredMails);

  const navigate = useNavigate();   

  const handleChange = () => {
    if (selectedEmails.includes(email._id)) {
        setSelectedEmails(prevState => prevState.filter(id => id !== email._id));
    } else {
        setSelectedEmails(prevState => [...prevState, email._id]);
    }
  };

  const toggleStarredEmails = () => {
    starredEmailsService.call({ id: email._id, value: !email.starred });
    setStarredEmail(prevState => !prevState);
    setRefreshEmails(prevState => !prevState);
  };

  return (
    <ParentWrapper>
      <Checkbox 
        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 17 }} />}
        checkedIcon={<CheckBoxIcon style={{ fontSize: 17 }} />}
        checked={selectedEmails.includes(email._id)}
        onChange={() => handleChange()} 
      />
      {
        email.starred ? 
          <StarIcon fontSize="small" style={{ marginRight: 10, color : '#f3c94b'}} onClick={() => toggleStarredEmails()} />
        :
          <StarBorderIcon fontSize="small" style={{ marginRight: 10 }} onClick={() => toggleStarredEmails()} /> 
      }
      <Box onClick = {() => navigate(routes.view.path, {state : {email : email}})}>
        <Typography style = {{ width : 400, overflow : 'hidden', fontSize: 14}}>{email.name}</Typography>
        <EmailTag>Inbox</EmailTag>
        <Typography style = {{ fontSize: 14}}>{email.subject} {email.body && '-'} {email.body}</Typography>
        <Date>
          {(new window.Date(email.date)).getDate()}
          {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
        </Date>
      </Box>
    </ParentWrapper>
  )

}

export default Email