import { FC, useRef, useState } from "react";

import { Box, IconButton, List, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ILsitItem } from "../types";
import { Droppable } from "react-beautiful-dnd";

import useOutsideClick from "../hooks/useOutsideClick";
import { useListItems } from "../store/ListItems.store";

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
  const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);
  const changingStatusRef = useRef<HTMLInputElement>(null);

  const changeStatus = useListItems((state) => state.changeStatus);

  const renameStatus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (e.target.value.trim() !== "") {
      changeStatus(id, e.target.value);
    }
  };

  const handleInput = () => {
    setIsInputOpen(!isInputOpen);
  };

  const toggleIsChanging = () => {
    setIsChangingStatus(!isChangingStatus);
  };

  useOutsideClick(changingStatusRef, toggleIsChanging, isChangingStatus);

  return (
    <>
      <Box
        sx={{
          marginBottom: "20px",
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 5px",
          padding: "10px 10px",
          borderRadius: "7px",
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        {isChangingStatus ? (
          <TextField
            ref={changingStatusRef}
            autoFocus
            variant="standard"
            sx={{ Height: "303px" }}
            onBlur={(e) => renameStatus(e)}
          />
        ) : (
          <Typography onClick={toggleIsChanging} variant="h5">
            {title}
          </Typography>
        )}
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
      </Box>
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
