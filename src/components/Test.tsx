import { useListItems } from '../store/ListItems.store';

import { Box, Container } from '@mui/material';

import ListComponent from './List';

const Test = () => {
      const columns = useListItems(state => state.columns);
  return (
    <Box sx={{
      backgroundColor: 'rgba(255, 172, 215, 0.5)',
      height: '100vh'
    }}>
      <Container sx={{
        display: 'flex', 
        gap: '15px', 
        maxHeight: '100vh',
        paddingTop: '50px' 
        }}>
          {columns.map(column => (
            <Box 
            key={column.id} 
            sx={{ 
              width: '100%',
              maxWidth: 300,
              height: '100%',
              padding: '10px',
              bgcolor: 'background.paper',
              borderRadius: '10px', 
              }}
            >
              <ListComponent listItems={column.listItems} id={column.id} title={column.title}/>
            </Box>
          ))}
        </Container>
    </Box>
  )
}

export default Test