import { useState, FC, useRef } from "react";

import { Box, Button, TextField } from "@mui/material";

import { useListItems } from "../store/ListItems.store";
import { useClickAway } from "react-use";

interface StatusCreatorProps {
  toggleStatusInput: () => void;
}

const StatusCreator: FC<StatusCreatorProps> = ({ toggleStatusInput }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const addStatus = useListItems((state) => state.addStatus);

  const addAndChange = () => {
    addStatus(inputValue);
    toggleStatusInput();
  };

  const addByEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key.toLowerCase() === "enter" && inputValue.trim().length > 0) {
      addAndChange();
    }
  };

  const createStatusRef = useRef(null);
  useClickAway(createStatusRef, toggleStatusInput);
  return (
    <Box
      ref={createStatusRef}
      sx={{
        maxHeight: "70px",
        minWidth: "350px",
        marginBottom: "20px",
        padding: "10px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 5px",
        borderRadius: "7px",
      }}
    >
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => addByEnter(e)}
        autoFocus
        sx={{
          borderRadius: "7px",
        }}
      ></TextField>
      <Button
        disabled={inputValue.trim().length <= 0}
        color="secondary"
        variant="contained"
        onClick={addAndChange}
      >
        save
      </Button>
    </Box>
  );
};

export default StatusCreator;
