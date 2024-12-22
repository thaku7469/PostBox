import React, { useState } from 'react';

import ComposeMail from './ComposeMail';
import { routes } from '../routes/routes';

import { Box, Button, styled, Typography, List, ListItem } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

import { SIDEBAR_DATA } from '../config/SidebarConfig';

import { useParams, NavLink } from 'react-router-dom';

const ButtonWrapper = styled(Box)({
  padding: '7px 106px 0 8px',
});

const StyledButton = styled(Button)({
  background: '#90e0ef',
  marginRight: 106,
  marginTop: 7,
  height: 60,
  width: 160,
  borderRadius: 15,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '"Roboto", "RobotoDraft", "Helvetica", "Arial", sans-serif',
  textTransform: 'none',
});

const CustomList = styled(List)( {
    margin: '10px 145px 0 10px',
    fontFamily: '"Roboto", "RobotoDraft", "Helvetica", "Arial", sans-serif',
    cursor: 'pointer',
    fontSize: 15,
    '& > a': {
      textDecoration: 'none',
      color: 'inherit',
    },
});

const SideBarContent = () => {
  const { type } = useParams();

  const [openMail, setOpenMail] = useState(false);

  const handleClick = () => {
    setOpenMail(true);
  };

  return (
    <>
      <ButtonWrapper>
        <StyledButton variant="contained" onClick={() => handleClick()}>
          <CreateOutlinedIcon color="action" style={{ marginRight: 13, color: '#000000', fontSize : 19}} />
          <Typography style={{ fontWeight: 500, color: '#000000', fontSize : 15}}>Compose</Typography>
        </StyledButton>
      </ButtonWrapper>

      <CustomList>
        {SIDEBAR_DATA.map((data, index) => (
            <NavLink to={`${routes.emails.path}/${data.name}`}>
                <ListItem
                    key={index}
                    style={
                    type === data.name.toLowerCase()
                        ? { backgroundColor: '#bfedf6', fontWeight: 500, minWidth: '230px', borderRadius : '50px'}
                        : { fontWeight: 500, minWidth: '230px', borderRadius : '50px'}
                    }
                >
                    <data.Icon style={{ marginRight: 30, fontSize: 19 }} />
                    {data.title}
                </ListItem>
            </NavLink>
        ))}
      </CustomList>
      <ComposeMail openMail={openMail} setOpenMail={setOpenMail} />
    </>
  );
};

export default SideBarContent;
