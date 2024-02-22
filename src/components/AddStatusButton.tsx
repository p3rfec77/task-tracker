import { FC } from "react";
import { Button } from "@mui/material";

interface AddStatusButtonProps {
  toggleStatusInput: () => void;
}

const AddStatusButton: FC<AddStatusButtonProps> = ({ toggleStatusInput }) => {
  return (
    <Button
      onClick={toggleStatusInput}
      sx={{
        maxHeight: "68px",
        minWidth: "350px",
        backgroundColor: "transparent",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 5px",
        padding: "10px 10px",
        borderRadius: "7px",
      }}
    >
      Add Status
    </Button>
  );
};

export default AddStatusButton;
