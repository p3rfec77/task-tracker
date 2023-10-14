import {useState, FC} from 'react'

import { Box, Button, TextField } from '@mui/material'

import { useListItems } from '../store/ListItems.store';

interface StatusCreatorProps {
    toggleStatus: () => void;
}

const StatusCreator: FC<StatusCreatorProps> = ({toggleStatus}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const addStatus = useListItems(state => state.addStatus);

    const addAndChange = () => {
        addStatus(inputValue);
        toggleStatus();
    }
  return (
    <Box sx={{
        maxHeight: '70px',
        minWidth: '25vw',
        marginBottom: '20px',
        padding: '10px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 5px',
        borderRadius: '7px',
    }}>
        <TextField 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus
        sx={{
            borderRadius: '7px',
            }}
        >
    </TextField>
    <Button 
    disabled={inputValue.trim().length <= 0} 
    color='secondary' variant='contained'
    onClick={addAndChange}
    >
        save
    </Button>
    </Box>
  )
}

export default StatusCreator