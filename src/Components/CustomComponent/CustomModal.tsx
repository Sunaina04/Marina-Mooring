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
}) => {
  return (
    <div className="card flex justify-content-center">
      <Button
        label={buttonText}
        icon={<img src="/assets/images/Plus.png" alt="icon" className="w-3.8 h-3.8 ml-4 mb-0.5" />}
        onClick={onClick}
        style={{
          width: '121px',
          height: '44px',
          minHeight: '44px',
          backgroundColor: '#0098FF',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: 600,
          color: '#FFFFFF',
          borderRadius: '5px',
          boxShadow: 'none',
          lineHeight: '18.75px',
          letterSpacing: '0.20000000298023224px',
        
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
