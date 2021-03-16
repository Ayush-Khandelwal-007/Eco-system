import { Avatar, Button, Menu, MenuItem } from '@material-ui/core'
import header from "./Header.module.css"
import React,{useState} from 'react'
import { Link } from 'react-router-dom';


function HeaderNav() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <div className={header.nav}>
            {/* <Notification/> */}
            <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <Avatar />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem><Link to='/'>Logout</Link></MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default HeaderNav
