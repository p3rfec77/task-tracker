import { FC, useState } from "react";

import { Draggable } from "react-beautiful-dnd";

import { useListItems } from "../store/ListItems.store";

import {
  ListItem,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import PopupModal from "./PopupModal";
import TaskInfo from "./TaskInfo";

interface LsitItemProps {
  title: string;
  description: string;
  TaskId: number;
  index: number;
  columnId: string;
}

const ListItemComponent: FC<LsitItemProps> = ({
  title,
  description,
  TaskId,
  index,
  columnId,
}) => {
  const deleteTask = useListItems((state) => state.deleteTask);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Draggable draggableId={TaskId.toString()} index={index}>
        {(provided, snapshot) => (
          <ListItem
            disablePadding
            sx={{
              width: "303px",
              background: snapshot.isDragging ? "rgba(0, 0, 0, 0.2)" : "white",
              marginBottom: "15px",
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 5px",
            }}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Card
              onClick={() => setIsModalOpen(true)}
              sx={{
                width: "100%",
                cursor: "pointer",
              }}
            >
              <CardContent sx={{ wordWrap: "break-word" }}>
                <Typography>{title}</Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "end" }}>
                <IconButton
                  color="error"
                  onClick={() => deleteTask(columnId, TaskId)}
                >
                  <CloseIcon />
                </IconButton>
              </CardActions>
            </Card>
          </ListItem>
        )}
      </Draggable>
      <PopupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskInfo id={TaskId} title={title} description={description} />
      </PopupModal>
    </>
  );
};

export default ListItemComponent;
