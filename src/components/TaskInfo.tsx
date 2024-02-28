import { FC, useState } from "react";

import { Box, Grow, Typography, TextField } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

import { useListItems } from "../store/ListItems.store";

interface TaskInfoProps {
  id: number;
  title: string;
  description: string;
}

const TaskInfo: FC<TaskInfoProps> = ({ id, title, description }) => {
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const changeDescription = useListItems((state) => state.changeDescription);

  const saveDescription = () => {
    if (descriptionInput.trim().length > 0) {
      changeDescription(id, descriptionInput);
      setIsDescriptionOpen(false);
    }
  };

  return (
    <Grow in>
      <Box
        sx={{
          background: "white",
          padding: "25px",
          width: "50vw",
          borderRadius: "20px",
        }}
      >
        <Typography
          sx={{ wordWrap: "break-word" }}
          fontSize={"40px"}
          variant="h6"
        >
          {title}
        </Typography>

        <Box>
          <Typography
            display={"flex"}
            alignItems={"center"}
            marginTop={"40px"}
            fontSize={"24px"}
            variant="body1"
          >
            <DescriptionIcon sx={{ marginRight: "5px" }} fontSize="large" />
            description:
          </Typography>
          {isDescriptionOpen || description.trim().length === 0 ? (
            <TextField
              value={descriptionInput}
              placeholder="add description..."
              color="secondary"
              margin="normal"
              variant="outlined"
              fullWidth
              autoFocus
              multiline
              minRows={5}
              onBlur={saveDescription}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          ) : (
            <Typography
              variant="body1"
              bgcolor={"secondary.light"}
              color={"black"}
              sx={{
                marginTop: "20px",
                padding: "20px",
                borderRadius: "10px",
                whiteSpace: "pre-wrap",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                setDescriptionInput(description);
                setIsDescriptionOpen(true);
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </Grow>
  );
};

export default TaskInfo;
