import { DragDropContext} from 'react-beautiful-dnd';

import { Box } from '@mui/material';

import ListComponent from './components/List';

function App() {

  const onDragEnd = (): void => {
    console.log('end');
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListComponent/>
      </Box>
    </DragDropContext>
  )
}

export default App
