import { useState, FC, useRef } from "react";

import { Box, Button, TextField } from "@mui/material";

import { useListItems } from "../store/ListItems.store";
import useOutsideClick from "../hooks/useOutsideClick";

interface StatusCreatorProps {
  toggleStatus: () => void;
  isOpen: boolean;
}

const StatusCreator: FC<StatusCreatorProps> = ({ toggleStatus, isOpen }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const addStatus = useListItems((state) => state.addStatus);

  const addAndChange = () => {
    addStatus(inputValue);
    toggleStatus();
  };

  const createStatusRef = useRef(null);
  useOutsideClick(createStatusRef, toggleStatus, isOpen);
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
