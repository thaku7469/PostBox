import React from 'react'

import { useOutletContext, useLocation } from 'react-router-dom';

import { Box,Typography, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { emptyProfilePic } from '../constants/Constants';

import useApi from '../hooks/useApi';
import { API_URLS } from '../api/Api.urls';

const IconWrapper = styled(Box) ({
  padding : 10
});

const Subject = styled(Typography) ({
  fontSize : 22,
  margin: '10px 0 20px 75px',
  display: 'flex'
});

const Indicator = styled(Box) ({
  fontSize : '12px !important',
  background : '#ddd',
  color : '#222',
  borderRadius : '4px',
  marginLeft : '8px',
  padding : '2px 4px',
  alignSelf : 'center'
});

const Image = styled('img') ({
  borderRadius : '50%',
  width : 40,
  height : 40,
  margin: '5px 10px 0 10px',
  backgroundColor: '#cccccc'
});

const Container = styled(Box) ({
  marginLeft : 15,
  width : '100%',
  '& > div': {
    display: 'flex',
    alignItems : 'center',
    '& > p > span': {
      fontSize : 12,
      color: '#5E5E5E'
    }
  }
});

const Date = styled(Typography) ({
  margin: '0 50px 0 auto',
  fontSize :12,
  color: '#5E5E5E'
});



const ViewEmail = () => {

  const { openDrawer } = useOutletContext();
  const { state } = useLocation();
  const { email } = state;

  const moveEmailsToBinService  = useApi(API_URLS.moveEmailsToBin);

  const deleteEmail = () => {
    moveEmailsToBinService.call([email._id]);
    window.history.back()
  };

  return (
    <Box 
      style = { openDrawer ? { marginLeft : 250, width : 'calc(100% - 230px)' } : { width : '100%' } }>
      <IconWrapper>
        <ArrowBackIcon 
          onClick = {() => window.history.back()} 
          color = 'action' 
          fontSize = 'small' 
          style = {{ cursor : 'pointer'}}
        />
        <DeleteOutlineOutlinedIcon 
          color = 'action' 
          fontSize = 'small' 
          style = {{ marginLeft : 40, cursor : 'pointer' }}
          onClick = {()=> deleteEmail()}
        />
      </IconWrapper>
      <Subject>
        {email.subject} <Indicator component="span">Inbox</Indicator>
      </Subject>
      <Box style={{ display: 'flex' }}>
        <Image src = {emptyProfilePic} alt = 'picture' />  
        <Container>
          <Box>
            <Typography>
              {email.to.split('@')[0]} 
              <Box component = "span">&nbsp;&#60;{email.to}&#62;</Box>
            </Typography>
            <Date>
              {(new window.Date(email.date)).getDate()}
              {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
              {(new window.Date(email.date)).getFullYear()} 
            </Date>
          </Box>
          <Typography style={{ marginTop: 20 }}>{email.body}</Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default ViewEmail