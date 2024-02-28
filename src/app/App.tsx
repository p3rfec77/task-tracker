import { useState } from "react";

import { useListItems } from "../store/ListItems.store";

import { Box } from "@mui/material";

import AddStatusButton from "../components/AddStatusButton";
import StatusCreator from "../components/StatusCreator";
import StatusColumn from "../components/StatusColumn";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

function App() {
  const changeOrder = useListItems((state) => state.changeOrder);
  const columns = useListItems((state) => state.columns);

  const onDragEnd = (result: DropResult): void => {
    const { draggableId, source, destination } = result;

    if (!destination) return;

    changeOrder(
      draggableId,
      source.index,
      source.droppableId,
      destination.index,
      destination.droppableId
    );
  };

  const [isCreatingStatusOpen, setStatusOpen] = useState<boolean>(false);
  const toggleCreateStatusInput = () => setStatusOpen((prev) => !prev);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          backgroundColor: "rgba(255, 172, 215, 0.5)",
          height: "100vh",
          padding: "50px 0px 50px 100px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            paddingBottom: "20px",
            height: "100%",
            overflow: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {columns.map((column) => (
            <StatusColumn
              id={column.id}
              listItems={column.listItems}
              title={column.title}
              key={column.id}
            />
          ))}
          {isCreatingStatusOpen ? (
            <StatusCreator toggleStatusInput={toggleCreateStatusInput} />
          ) : (
            <AddStatusButton toggleStatusInput={toggleCreateStatusInput} />
          )}
        </Box>
      </Box>
    </DragDropContext>
  );
}

export default App;
