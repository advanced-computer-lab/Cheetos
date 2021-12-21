import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Redirect } from "react-router-dom";

export default function ProfileDropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
       
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} style={{color:"white",fontSize:"1.5rem"}}>
            <Avatar sx={{ width: 33, height: 30,backgroundColor:"#37A1E2" }}>{props.username ? props.username[0].toUpperCase() : ''}</Avatar>
             <p style={{marginBottom:"0",marginLeft:"0.5rem"}}>{props.username}</p>
            <KeyboardArrowDownIcon/>
          </IconButton>
        
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
          
        <Link to={{pathname: "/profile"}} style={{textDecoration:"none",color:"black"}}>
            <MenuItem>
              <Avatar />
              Profile
            </MenuItem>
        </Link>
        <Link to={{pathname: "/bookings"}} style={{textDecoration:"none",color:"black"}}>
        <MenuItem>
         
          
         
            
                <Avatar>
                    <BookmarksIcon fontSize="small" />
                </Avatar>

          My Bookings
        </MenuItem>
        </Link>
        <Divider />
       
      
        <MenuItem onClick = {()=>{
        localStorage.removeItem("userId")
        localStorage.removeItem("token")
        props.ParentRedirect()
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}