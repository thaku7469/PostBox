import React from 'react'

import { Drawer }  from '@mui/material';

import SideBarContent from './SideBarContent';

const SideBar = ( { openDrawer }) => {
  return (
    <Drawer
        anchor = 'left'
        open = {openDrawer}
        hideBackdrop = {true}
        ModalProps = {{
            keepMounted : true
        }}
        variant="persistent"
        sx = {{
            '& .MuiDrawer-paper' : {
                marginTop : '62px',
                width : 250,
                background : '#f7f8fc',
                borderRight : 'none'
            }
        }}
    >
        <SideBarContent />
    </Drawer>
  )
}

export default SideBar