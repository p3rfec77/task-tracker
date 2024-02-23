import { FC, useRef, useState } from "react";

import { useClickAway } from "react-use";

import { Box, IconButton, List, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ILsitItem } from "../types";
import { Droppable } from "react-beautiful-dnd";

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
  const [isCreateTaskOpen, SetisCreateTaskOpen] = useState<boolean>(false);
  const handleCreateTask = () => {
    SetisCreateTaskOpen((prev) => !prev);
  };

  const changeStatus = useListItems((state) => state.changeStatus);
  const renameStatus = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.trim() !== "") {
      changeStatus(id, e.target.value);
    }
  };

  const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);
  const changingStatusRef = useRef<HTMLDivElement>(null);

  useClickAway(changingStatusRef, () => setIsChangingStatus(false));

  return (
    <>
      <Box
        sx={{
          width: "100%",
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
            multiline
            ref={changingStatusRef}
            autoFocus
            variant="standard"
            sx={{ Height: "303px" }}
            onChange={(e) => renameStatus(e)}
          />
        ) : (
          <Typography
            sx={{
              width: "220px",
              wordWrap: "break-word",
            }}
            onClick={() => {
              setIsChangingStatus(true);
            }}
            variant="h5"
          >
            {title}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            height: "40px",
          }}
        >
          <ListMenuBtn id={id} />
          <IconButton type="button" onClick={handleCreateTask}>
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
