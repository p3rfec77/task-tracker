import {FC} from 'react';

import {List} from '@mui/material';

import { useListItems, ILsitItem } from '../store/ListItems.store';
import { Droppable } from 'react-beautiful-dnd';

import ListItemComponent from './ListItem';

interface ListProps {
    id: string,
}

const ListComponent: FC<ListProps> = ({id}) => {
    const listItems: ILsitItem[] = useListItems(state => state.listItems);
  return (
    <Droppable droppableId={id}>
        {(provided, snapshot) => (
            <List 
            ref={provided.innerRef} 
            {...provided.droppableProps} 
            sx={{
                border: '2px solid black', 
                background: snapshot.isDraggingOver ? 'rgba(0, 255, 0, 0.3)' : 'white',
                padding: '10px'
                }}>
                {listItems.map(({title, id}, index) => (
                    <ListItemComponent key={id} title={title} id={id} index={index}/>
                ))}
                {provided.placeholder}
            </List>           
        )}
    </Droppable>
  )
}

export default ListComponent