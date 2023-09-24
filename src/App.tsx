import { DragDropContext, DropResult} from 'react-beautiful-dnd';

import { useColumns } from './store/Columns.store';

import { Box } from '@mui/material';

import ListComponent from './components/List';

function App() {
  const columns = useColumns(state => state.columns);

  const onDragEnd = (result: DropResult): void => {
    const {draggableId, source, destination} = result;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columns.map(({id, title, taskIds}) => (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListComponent id={id} title={title} taskIds={taskIds}/>
      </Box>
      ))}
    </DragDropContext>
  )
}

export default App
