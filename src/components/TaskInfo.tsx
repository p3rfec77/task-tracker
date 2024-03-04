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
  const { changeDescription, changeTaskName } = useListItems();

  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const saveDescription = () => {
    if (descriptionInput.trim().length > 0) {
      changeDescription(id, descriptionInput);
      setIsDescriptionOpen(false);
    }
  };

  const [isTitleOpen, setIsTitleOpen] = useState<boolean>(false);
  const [titileInput, setTitileInput] = useState<string>("");
  const changeTaskTitle = () => {
    if (titileInput.trim().length > 0) {
      changeTaskName(id, titileInput);
      setIsTitleOpen(false);
    }
  };

  return (
    <Grow in>
      <Box
        sx={{
          background: "white",
          padding: "25px",
          width: "50vw",
          minWidth: "350px",
          borderRadius: "20px",
        }}
      >
        {isTitleOpen ? (
          <TextField
            color="secondary"
            variant="standard"
            sx={{ width: "50%", height: "64px" }}
            inputProps={{
              style: {
                marginTop: "8.5px",
                fontSize: "40px",
                lineHeight: "40px",
                fontWeight: "500",
              },
            }}
            multiline
            autoFocus
            value={titileInput}
            onKeyDown={(e) => e.key === "Enter" && changeTaskTitle()}
            onBlur={changeTaskTitle}
            onChange={(e) => setTitileInput(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        ) : (
          <Typography
            sx={{
              wordWrap: "break-word",
              fontSize: "40px",
            }}
            variant="h6"
            onClick={() => {
              setTitileInput(title);
              setIsTitleOpen(true);
            }}
          >
            {title}
          </Typography>
        )}

        <Box marginTop={"40px"}>
          <Typography
            display={"flex"}
            alignItems={"center"}
            fontSize={"24px"}
            variant="body1"
          >
            <DescriptionIcon sx={{ marginRight: "5px" }} fontSize="large" />
            description:
          </Typography>
          {isDescriptionOpen || description.trim().length === 0 ? (
            <TextField
              sx={{ marginTop: "20px" }}
              value={descriptionInput}
              placeholder="add description..."
              color="secondary"
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
