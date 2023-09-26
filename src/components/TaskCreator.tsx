import { FC, useState } from 'react';

import {Card, CardActions, CardContent, Button, TextField} from '@mui/material';

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

  return (
    <Card sx={{ width: '100%' }}>
        <CardContent>
            <TextField
             variant='standard' 
             placeholder='write task...' 
             value={input} 
             onChange={(e) => setInput(e.target.value)}/>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={createTask}>Save</Button>
        </CardActions>
    </Card>
  )
}

export default TaskCreator