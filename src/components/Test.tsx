import { useState } from "react";

import { useListItems } from "../store/ListItems.store";

import { Box } from "@mui/material";

import AddStatusButton from "./AddStatusButton";
import StatusCreator from "./StatusCreator";
import StatusColumn from "./StatusColumn";

const Test = () => {
  const columns = useListItems((state) => state.columns);

  const [isCreatingStatusOpen, setStatusOpen] = useState<boolean>(false);

  const toggleStatus = () => setStatusOpen(!isCreatingStatusOpen);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 172, 215, 0.5)",
        height: "100vh",
        padding: "50px 100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          paddingBottom: "20px",
          height: "100%",
          overflow: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {columns.map((column) => (
          <StatusColumn
            id={column.id}
            listItems={column.listItems}
            title={column.title}
            key={column.id}
          />
        ))}
        {isCreatingStatusOpen ? (
          <StatusCreator toggleStatus={toggleStatus} />
        ) : (
          <AddStatusButton changeStatus={toggleStatus} />
        )}
      </Box>
    </Box>
  );
};

export default Test;
