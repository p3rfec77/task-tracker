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
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(true);
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
        <Typography fontSize={"40px"} variant="h6">
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
          {isDescriptionOpen || descriptionInput.trim().length === 0 ? (
            <TextField
              value={descriptionInput}
              placeholder="add description..."
              margin="normal"
              variant="outlined"
              fullWidth
              autoFocus
              multiline
              minRows={5}
              onFocus={(e) => e.target.select()}
              onBlur={saveDescription}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          ) : (
            <Typography onClick={() => setIsDescriptionOpen(true)}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </Grow>
  );
};

export default TaskInfo;
