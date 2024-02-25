import { FC, useRef, useState } from "react";
import { useClickAway } from "react-use";

import { useListItems } from "../store/ListItems.store";

import { Box, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ListMenuBtn from "./ListMenuBtn";

interface ColumnHeaderProps {
  title: string;
  id: string;
  handleCreateTask: () => void;
}

const ColumnHeader: FC<ColumnHeaderProps> = ({
  id,
  title,
  handleCreateTask,
}) => {
  const changeStatus = useListItems((state) => state.changeStatus);
  const renameStatus = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.trim() !== "") {
      changeStatus(id, e.target.value);
    }
  };

  const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);
  const changingStatusRef = useRef<HTMLDivElement>(null);

  useClickAway(changingStatusRef, () => setIsChangingStatus(false));
  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "20px",
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 5px",
        padding: "10px 10px",
        borderRadius: "7px",
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      {isChangingStatus ? (
        <TextField
          multiline
          ref={changingStatusRef}
          autoFocus
          variant="standard"
          sx={{ Height: "303px" }}
          onChange={(e) => renameStatus(e)}
          onKeyDown={(e) => e.key === "Enter" && setIsChangingStatus(false)}
        />
      ) : (
        <Typography
          sx={{
            width: "220px",
            wordWrap: "break-word",
          }}
          onClick={() => {
            setIsChangingStatus(true);
          }}
          variant="h5"
        >
          {title}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          height: "40px",
        }}
      >
        <ListMenuBtn id={id} />
        <IconButton type="button" onClick={handleCreateTask}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ColumnHeader;
