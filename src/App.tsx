import { DragDropContext, DropResult} from 'react-beautiful-dnd';

import { useColumns } from './store/Columns.store';
import { useListItems } from './store/ListItems.store';

import { Box } from '@mui/material';

import ListComponent from './components/List';

function App() {
  const columns = useColumns(state => state.columns);
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

    changeOrder(draggableId, source.index, destination.index);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListComponent id={columns['column-1'].id}/>
      </Box>
    </DragDropContext>
  )
}

export default App
