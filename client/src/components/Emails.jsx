import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import Email from './Email';
import NoMails from './helperComponents/NoMails';

import { API_URLS } from '../api/Api.urls';
import useApi from '../hooks/useApi';
import { EMPTY_TABS } from '../constants/Constants';

import { Checkbox, Box, List } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const Emails = () => {

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refreshEmails, setRefreshEmails] = useState(false);
  const [starredEmail, setStarredEmail] = useState(false);

  const { openDrawer } = useOutletContext();
  const { type } = useParams();

  const getEmailsService = useApi(API_URLS.getEmailFromType);
  const moveEmailsToBinService  = useApi(API_URLS.moveEmailsToBin);
  const deleteEmailsService = useApi(API_URLS.deleteEmails);

  useEffect(() => {
    getEmailsService.call({}, type)
  }, [type, refreshEmails, starredEmail])

  const selectAllEmails = (e) => {
    if (e.target.checked) {
      const emails = getEmailsService?.response?.map(email => email._id); // This should be an array
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
    }
  };  

  const deleteSelectedEmails = (e) => {
    if(type === 'bin'){
      deleteEmailsService.call(selectedEmails);
    } else {
      moveEmailsToBinService.call(selectedEmails);
    }
    setRefreshEmails(prevState => !prevState);
    setStarredEmail(prevState => !prevState);
  };



  return (
    <Box style = { openDrawer ? {marginLeft : 230, width : 'calc(100% - 230px)'} : {width : '100%'} }>
      <Box style = {{ padding : '0 10px 10px 10px', display : 'flex', alignItems : 'center'}}>
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 17 }} />}
          checkedIcon={<CheckBoxIcon style={{ fontSize: 17 }} />}
          onChange={(e) => selectAllEmails(e)}
        />
        <DeleteOutlineOutlinedIcon 
          style = {{ fontSize : 17, cursor : 'pointer' }}
          onClick={(e) => deleteSelectedEmails(e)}
        />
      </Box>
      <List>
      {
        getEmailsService?.response?.map((email) => (
          <Email 
            key={email.id} 
            email={email}
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
            setStarredEmail={setStarredEmail} 
            setRefreshEmails={setRefreshEmails}
          />
        ))
      }
      </List>
      {
        getEmailsService?.response?.length === 0 &&
          <NoMails message={EMPTY_TABS[type]} />
      }
    </Box>
  )
}

export default Emails