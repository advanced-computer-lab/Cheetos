import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{color:"white"}}
      >
        Passengers
        <KeyboardArrowDownIcon/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
 
        <MenuItem onClick={handleClose}>  <TextField
          id="outlined-number"
          label="Adults"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          style={{width:"9rem"}}
        />
        </MenuItem>

        <MenuItem onClick={handleClose}> <TextField
          id="outlined-number"
          label="Children"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          style={{width:"9rem"}}
        />
        </MenuItem>
   
      </Menu>
    </div>
  );
}
