import { DragDropContext, DropResult} from 'react-beautiful-dnd';

import { useListItems } from './store/ListItems.store';

import { Box } from '@mui/material';

import ListComponent from './components/List';

function App() {
  const columns = useListItems(state => state.columns);
  const changeOrder = useListItems(state => state.changeOrder);

  const onDragEnd = (result: DropResult): void => {
    console.log(result);
    const {draggableId, source, destination} = result;

    if(!destination) return;

    if (
      destination.droppableId === source.droppableId && 
      destination.index === source.index
      ) {
        return;
    }

    changeOrder(draggableId, source.index, source.droppableId, destination.index);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columns.map(column => (
        <Box key={column.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListComponent listItems={column.listItems} id={column.id} />
        </Box>
      ))}
    </DragDropContext>
  )
}

export default App
