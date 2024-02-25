import { FC, useState } from "react";

import { List } from "@mui/material";

import { ILsitItem } from "../types";
import { Droppable } from "react-beautiful-dnd";

import ListItemComponent from "./ListItem";
import TaskCreator from "./TaskCreator";
import ColumnHeader from "./ColumnHeader";

interface ListProps {
  id: string;
  title: string;
  listItems: ILsitItem[];
}

const ListComponent: FC<ListProps> = ({ id, listItems, title }) => {
  const [isCreateTaskOpen, SetisCreateTaskOpen] = useState<boolean>(false);
  const handleCreateTask = () => {
    SetisCreateTaskOpen((prev) => !prev);
  };

  return (
    <>
      <ColumnHeader title={title} id={id} handleCreateTask={handleCreateTask} />
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              background: snapshot.isDraggingOver
                ? "rgba(235, 235, 235, 0.8)"
                : "white",
              padding: "10px",
            }}
          >
            {listItems.map((item, index) => (
              <ListItemComponent
                key={item.id}
                title={item.title}
                TaskId={item.id}
                columnId={id}
                index={index}
              />
            ))}
            {provided.placeholder}
            {isCreateTaskOpen && (
              <TaskCreator id={id} inputHandler={handleCreateTask} />
            )}
          </List>
        )}
      </Droppable>
    </>
  );
};

export default ListComponent;
