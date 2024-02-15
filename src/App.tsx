import { DragDropContext, DropResult } from "react-beautiful-dnd";

import Test from "./components/Test";

import { useListItems } from "./store/ListItems.store";

function App() {
  const changeOrder = useListItems((state) => state.changeOrder);

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Test />
    </DragDropContext>
  );
}

export default App;
