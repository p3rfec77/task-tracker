import { Box } from "@mui/material";
import ListComponent from "./List";
import { IColumn } from "../types";

interface StatusColumnProps extends IColumn {}

const StatusColumn = ({ id, listItems, title }: StatusColumnProps) => {
  return (
    <Box
      key={id}
      sx={{
        minWidth: "350px",
        maxHeight: "100%",
        padding: "10px",
        bgcolor: "background.paper",
        borderRadius: "10px",
        overflow: "auto",
        scrollbarGutter: "stable",
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
          width: "7px",
        },
        "&::-webkit-scrollbar-track": {
          margin: "5px 0px",
          backgroundColor: "transparent",
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-thumb": {
          width: "7px",
          borderRadius: 3,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <ListComponent listItems={listItems} id={id} title={title} />
    </Box>
  );
};

export default StatusColumn;
