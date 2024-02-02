import { useState } from "react";

import { useListItems } from "../store/ListItems.store";

import { Box } from "@mui/material";

import ListComponent from "./List";
import AddStatusButton from "./AddStatusButton";
import StatusCreator from "./StatusCreator";

const Test = () => {
  const columns = useListItems((state) => state.columns);

  const [isCreatingStatusOpen, setStatusOpen] = useState<boolean>(false);

  const toggleStatus = () => setStatusOpen(!isCreatingStatusOpen);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 172, 215, 0.5)",
        height: "100vh",
        padding: "0px 100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          minHeight: "100vh",
          paddingTop: "50px",
          overflow: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {columns.map((column) => (
          <Box
            key={column.id}
            sx={{
              minWidth: "25vw",
              maxHeight: "90vh",
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
            <ListComponent
              listItems={column.listItems}
              id={column.id}
              title={column.title}
            />
          </Box>
        ))}
        {isCreatingStatusOpen ? (
          <StatusCreator
            isOpen={isCreatingStatusOpen}
            toggleStatus={toggleStatus}
          />
        ) : (
          <AddStatusButton changeStatus={toggleStatus} />
        )}
      </Box>
    </Box>
  );
};

export default Test;
