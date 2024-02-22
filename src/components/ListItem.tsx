import { FC } from "react";

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

  return (
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
          <Card sx={{ width: "100%", cursor: "pointer" }}>
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
  );
};

export default ListItemComponent;
