import {useState, FC} from 'react';

import { useListItems } from '../store/ListItems.store';

import { IconButton, MenuItem, Menu } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface ListMenuBtnProps {
    id: string,
}

const ListMenuBtn: FC<ListMenuBtnProps> = ({id}) => {
  const removeStatus = useListItems(state => state.removeStatus);
  const removeColumn = () => {
    removeStatus(id);
    handleClose();
  }

  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => handleClick(e)}
      >
        <MoreHorizIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
         onClick={removeColumn}
         sx={{color: 'red'}}
         >
            Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ListMenuBtn