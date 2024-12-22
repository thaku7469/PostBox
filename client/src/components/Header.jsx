import React from 'react'

import { AppBar, Box, Toolbar, InputBase, styled} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { gmailLogo } from '../constants/Constants.js'

const StyledAppBar = styled(AppBar)({
    background : '#f7f8fc',
    boxShadow : 'none',
    height : 65,
    display : 'flex',
    justifyContent : 'center',
    padding : 0
});

const SearchBox = styled(Box)({
    display : 'flex', 
    alignItems : 'center', 
    justifyContent : 'space-between', 
    background : '#eaf1fb',
    marginLeft : 80,
    borderRadius : 24, 
    minWidth : 750,
    height : 40, 
    padding: '0 20px', 
    '& > div' : {
        width : '100%', 
        padding : '0 5px'
    }
});

const IconBox = styled(Box)({
    width : '100%',
    display : 'flex', 
    justifyContent: 'flex-end',
    '& > svg' : {
        marginLeft : 25
    },
})


const Header = ({ toggleDrawer }) => {
  return (
    <Box style = {{height : 64, margin: 0, padding: 0}}>
        <StyledAppBar position="fixed" style={{ top: 0, left: 0, right: 0 }} > 
            <Toolbar>
                <MenuIcon color = 'action' onClick = { toggleDrawer } style = {{cursor : 'pointer'}}/>
                <img src = {gmailLogo} alt = 'logo' style = {{width : 110, marginLeft : 8}}/>
                <SearchBox>
                    <SearchIcon color = 'action' style={{ fontSize: 20 }}/>
                    <InputBase 
                        placeholder = 'Search mail'
                    />
                    <TuneIcon color = 'action' style={{ fontSize: 20 }}/>
                </SearchBox>
                <IconBox>
                    <HelpOutlineOutlinedIcon color = 'action' style={{ fontSize: 22 }}/>
                    <SettingsOutlinedIcon color = 'action' style={{ fontSize: 22 }}/>
                    <AppsOutlinedIcon color = 'action' style={{ fontSize: 22 }}/>
                    <AccountCircleOutlinedIcon color = 'action' style={{ fontSize: 22 }}/>
                </IconBox>
            </Toolbar>
        </StyledAppBar> 
    </Box>
  )
}

export default Header