import { FC, useState } from 'react';

import {Card, CardActions, CardContent, Button, TextField, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useListItems } from '../store/ListItems.store';

interface TaskCreatorProps {
    id: string,
    inputHandler: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskCreator: FC<TaskCreatorProps> = ({id, inputHandler}) => {
    const [input, setInput] = useState<string>('');
    const addTask = useListItems(state => state.addTask);

    const createTask = () => {
        addTask(id, input);
        inputHandler(false);
        setInput('');
    }

    const createTaskByEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key.toLowerCase() === 'enter') {
            createTask();
        }
    }

  return (
    <Card sx={{ width: '100%' }}>
        <CardContent>
            <TextField
            autoFocus
            required
            variant='standard' 
            placeholder='write task...' 
            value={input} 
            onKeyDown={(e) =>createTaskByEnter(e)}
            onChange={(e) => setInput(e.target.value)}/>
        </CardContent>
        <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
            <CardActions>
                <Button disabled={input.trim().length <= 0} type='submit' color='secondary' variant='contained' size="small" onClick={createTask}>Save</Button>
            </CardActions>
            <CardActions>
                <IconButton color='error' onClick={() => inputHandler(false)}>
                    <CloseIcon/>
                </IconButton>
            </CardActions>
        </CardContent>
    </Card>
  )
}

export default TaskCreator