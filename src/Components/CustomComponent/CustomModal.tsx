import React from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { CustomModalProps } from '../../Type/ComponentBasedType'

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
  footerContent,
  icon,
  button,
}) => {
  return (
    <div className="card flex justify-content-center">
      {!button && (
        <Button
          label={buttonText}
          icon={
            // <img src="/assets/images/Plus.png" alt="icon" className="w-3.8 h-3.8 ml-4 mb-0.5" />
            icon
          }
          onClick={onClick}
          style={buttonStyle}
        />
      )}
      <Dialog
        header={headerText}
        headerStyle={{ cursor: 'context-menu' }}
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
