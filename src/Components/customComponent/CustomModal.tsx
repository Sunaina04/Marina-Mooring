import React, { ReactNode } from "react";
import { Close } from "@mui/icons-material";
import { Backdrop, Box, IconButton, Modal } from "@mui/material";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "50%",
  bgcolor: "background.white",
  borderRadius: "25px",
  p: 3,
  maxHeight: "90vh",
  overflowY: "auto",
};

interface CustomModelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
  styleOverrides?: object;
  closeBtn?: boolean;
  height?: number;
  width?: number | string;
}

const CustomModal: React.FC<CustomModelProps> = ({
  open,
  setOpen,
  children,
  styleOverrides,
  closeBtn = true,
  height = 500,
  width = "50%",
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{ ...style, ...styleOverrides, width: { md: width, xs: "90%" } }}
      >
        {closeBtn && (
          <Box textAlign={"right"} sx={{ position: "relative" }}>
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                top: "0px",
                right: "0px",
                position: "absolute",
              }}
            >
              <Close />
            </IconButton>
          </Box>
        )}

        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
