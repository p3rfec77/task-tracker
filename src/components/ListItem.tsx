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
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PopupModal from "./PopupModal";

interface LsitItemProps {
  title: string;
  TaskId: number;
  index: number;
  columnId: string;
}

const ListItemComponent: FC<LsitItemProps> = ({
  title,
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
              marginBottom: "10px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 5px",
            }}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Card
              onClick={() => setIsModalOpen(true)}
              sx={{ width: "100%", cursor: "pointer" }}
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
        <Box sx={{ height: "200px", width: "200px", background: "white" }}>
          <p>aaaaaaaaaaa</p>
        </Box>
      </PopupModal>
    </>
  );
};

export default ListItemComponent;
