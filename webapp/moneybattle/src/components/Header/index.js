import React from 'react';
import './Header.scss';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
const Header = (props) => {
    const handleClose = () => {

    }
    const handleClick = () => {
        
    }
    return (<div className='Header'>
        <div className='content'>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
           User
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        </div>
    </div>)
}

export default Header;