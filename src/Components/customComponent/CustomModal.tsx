import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ButtonComponent from "../Common/ButtonComponent";
import { InputText } from "primereact/inputtext";

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
      <div className="flex gap-4">
        <div>
          <div className="p-input-icon-left">
            <i className="pi pi-search text-[#D2D2D2]" />
            <InputText
              placeholder="Search"
              className="h-[5vh] cursor-pointer font-bold"
            />
          </div>
        </div>

        <div>
          {/* <Button
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
              fontWeight: "bolder",
              fontSize: "0.65vw",
           
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
          </Button> */}
          {/* <ButtonComponent



            label={"ADD NEW"}
            onClick={() => {
              setInternalVisible(true);


            }}
            style={{
              width: "10vw",
              height: "5vh",
              backgroundColor: "black",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.80vw",
            }}
          >
            <img
              src="/assets/images/more.png"
              alt="icon"
              className="p-icon  w-4 ml-3 "
              style={{
                filter: "invert(100%)",
                color: "whitesmoke",
                fontWeight: "bolder",
              }}
            />
          </ButtonComponent> */}

<ButtonComponent
  onClick={() => {
    setInternalVisible(true);
  }}
  style={{
    width: "7vw",
    height: "5vh",
    backgroundColor: "black",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
    fontSize: "0.50rem",
    position: "relative",
    display: "flex", 
 

    
  }}
  label=""
>
  <img
    src="/assets/images/plus.png"
    alt="icon"
    className="w-3 mr-3" // Adjust margin to your preference
    style={{
      filter: "invert(100%)",
      color: "whitesmoke",
      fontWeight: "bolder",
    }}
  />
  ADD NEW
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
        </div>
      </div>
    </>
  );
};

export default CustomModal;
