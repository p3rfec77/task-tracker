import { FC, useState } from "react";

import { Box, IconButton, List, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ILsitItem } from "../types";
import { Droppable } from "react-beautiful-dnd";

import ListItemComponent from "./ListItem";
import TaskCreator from "./TaskCreator";
import ListMenuBtn from "./ListMenuBtn";

interface ListProps {
  id: string;
  title: string;
  listItems: ILsitItem[];
}

const ListComponent: FC<ListProps> = ({ id, listItems, title }) => {
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
  const handleInput = () => {
    setIsInputOpen(!isInputOpen);
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 5px",
          padding: "10px 10px",
          borderRadius: "7px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <Box
          sx={{
            display: "flex",
          }}
        >
          <ListMenuBtn id={id} />
          <IconButton type="button" onClick={handleInput}>
            <AddIcon />
          </IconButton>
        </Box>
      </Typography>
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
            {isInputOpen && (
              <TaskCreator
                inputStatus={isInputOpen}
                id={id}
                inputHandler={handleInput}
              />
            )}
          </List>
        )}
      </Droppable>
    </>
  );
};

export default ListComponent;
