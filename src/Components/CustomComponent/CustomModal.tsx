import React from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { CustomModalProps } from '../../Type/ComponentBasedType'
export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: "''",
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.white',
  borderRadius: '25px',
  p: 3,
  maxHeight: '90vh',
  overflowY: 'auto',
}
const CustomModal: React.FC<CustomModalProps> = ({
  buttonText,
  headerText,
  dialogProps,
  children,
  visible,
  onClick,
  onHide,
  buttonStyle,
  dialogStyle,
}) => {
  return (
    <div className="card flex justify-content-center">
      <Button
        label={buttonText}
        icon={
          <img
            src="/assets/images/plus.png"
            alt="icon"
            className="w-4 ml-2 "
            style={{
              filter: 'invert(100%)',
              color: 'white',
              fontWeight: 'bolder',
            }}
          />
        }
        onClick={onClick}
        style={{
          width: '121px',
          height: '44px',
          minHeight: '44px',
          backgroundColor: '#0098FF',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 700,
          color: 'white',
          borderRadius: '10px',
          marginLeft: '8px',
          boxShadow:'none',
          
        }}
      />

      <Dialog
        header={headerText}
        {...dialogProps}
        visible={visible}
        modal={false}
        onHide={onHide}
        draggable={false}
        style={dialogStyle}>
        {children}
      </Dialog>
    </div>
  )
}

export default CustomModal
