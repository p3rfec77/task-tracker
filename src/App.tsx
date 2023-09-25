import { DragDropContext, DropResult} from 'react-beautiful-dnd';

import { useListItems } from './store/ListItems.store';

import { Box, Container } from '@mui/material';

import ListComponent from './components/List';

function App() {
  const columns = useListItems(state => state.columns);
  const changeOrder = useListItems(state => state.changeOrder);

  const onDragEnd = (result: DropResult): void => {
    console.log(result);
    const {draggableId, source, destination} = result;

    if(!destination) return;

    changeOrder(draggableId, source.index, source.droppableId, destination.index, destination.droppableId);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container sx={{display: 'flex', gap: '15px'}}>
        {columns.map(column => (
          <Box key={column.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListComponent listItems={column.listItems} id={column.id} />
          </Box>
        ))}
      </Container>
    </DragDropContext>
  )
}

export default App
