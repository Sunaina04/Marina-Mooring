import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ButtonComponent from "../Common/ButtonComponent";

interface CustomModalProps {
  onClick: () => void;
  visible: boolean;
  style?: React.CSSProperties;
  onHide: () => void;
  children?: React.ReactNode;
  header?: string;
  label?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  onClick,
  visible,
  style,
  onHide,
  children,
  header,
  label,
}) => {
  const [internalVisible, setInternalVisible] = useState<boolean>(false);

  return (
    <>
      <ButtonComponent
        label={"ADD NEW"}
        onClick={() => {
          onClick();
          setInternalVisible(true);
        }}
        style={{
          width: "7vw",
          height: "5vh",
          backgroundColor: "black",
          cursor: "pointer",
          color: "white",
          fontWeight: "bold",
          fontSize: "0.80vw",
        }}
      >
        <img
          src="/assets/images/plus.png"
          alt="icon"
          className="p-icon  w-4 mr-4 "
          style={{
            filter: "invert(100%)",
            color: "whitesmoke",
            fontWeight: "bolder",
          }}
        />
      </ButtonComponent>

      <Dialog
        header={header}
        visible={visible || internalVisible}
        style={style}
        onHide={() => {
          onHide();
          setInternalVisible(false);
        }}
      >
        {children}
      </Dialog>
    </>
  );
};

export default CustomModal;
