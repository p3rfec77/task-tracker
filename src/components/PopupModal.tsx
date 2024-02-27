import { FC } from "react";

import { Box, Modal } from "@mui/material";

interface PopupModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const PopupModal: FC<PopupModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <Modal sx={{ height: "100vh" }} open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          ":focus": { outline: "none" },
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default PopupModal;
