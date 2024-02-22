import { FC, useRef, useState } from "react";

import { useClickAway } from "react-use";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useListItems } from "../store/ListItems.store";

interface TaskCreatorProps {
  id: string;
  inputHandler: () => void;
}

const TaskCreator: FC<TaskCreatorProps> = ({ id, inputHandler }) => {
  const taskCreatorRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState<string>("");
  const addTask = useListItems((state) => state.addTask);

  const createTask = () => {
    addTask(id, input);
    inputHandler();
    setInput("");
  };

  const createTaskByEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key.toLowerCase() === "enter" && input.trim().length > 0) {
      createTask();
    }
  };

  useClickAway(taskCreatorRef, inputHandler);

  return (
    <Card ref={taskCreatorRef} className="card" sx={{ width: "100%" }}>
      <CardContent data-taskcreator={true}>
        <TextField
          autoFocus
          required
          variant="standard"
          placeholder="write task..."
          value={input}
          onKeyDown={(e) => createTaskByEnter(e)}
          onChange={(e) => setInput(e.target.value)}
        />
      </CardContent>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardActions data-taskcreator={true}>
          <Button
            disabled={input.trim().length <= 0}
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
            onClick={createTask}
          >
            Save
          </Button>
        </CardActions>
        <CardActions>
          <IconButton color="error" onClick={inputHandler}>
            <CloseIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default TaskCreator;
