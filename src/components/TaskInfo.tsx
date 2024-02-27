import { FC } from "react";

import { Box, Grow, Typography, TextField } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

interface TaskInfoProps {
  title: string;
  description: string;
}

const TaskInfo: FC<TaskInfoProps> = ({ title, description }) => {
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
          <TextField
            value={description}
            placeholder="add description..."
            margin="normal"
            variant="outlined"
            fullWidth
            multiline
            minRows={5}
          />
        </Box>
      </Box>
    </Grow>
  );
};

export default TaskInfo;
