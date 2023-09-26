import {FC} from 'react'

import { Draggable } from 'react-beautiful-dnd'

import { ListItem, ListItemButton, ListItemText } from '@mui/material'

interface LsitItemProps {
    title: string,
    id: number,
    index: number
}

const ListItemComponent: FC<LsitItemProps> = ({title, id, index}) => {
  return (
    <Draggable draggableId={id.toString()} index={index}>
        {(provided, snapshot) => (
            <ListItem 
            disablePadding
            sx={{
                background: snapshot.isDragging ? 'rgba(0, 0, 0, 0.2)' : 'white',
                marginBottom: '10px',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 5px'
            }}
            {...provided.dragHandleProps} 
            {...provided.draggableProps} 
            ref={provided.innerRef} 
            >
                <ListItemButton>
                    <ListItemText primary={title} />
                </ListItemButton>
            </ListItem>
        )}
    </Draggable>
  )
}

export default ListItemComponent