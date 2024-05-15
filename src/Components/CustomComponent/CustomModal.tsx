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
          borderRadius: '0.50rem',
          marginLeft: '8px',
        }}
      />

      <Dialog
        header={headerText}
        {...dialogProps}
        visible={visible}
        onHide={onHide}
        style={{
          width: '850px',
          minWidth: '850px',
          height: '630px',
          minHeight: '630px',
          borderRadius: '1rem',
          maxHeight: '95% !important',
        }}>
        {children}
      </Dialog>
    </div>
  )
}

export default CustomModal
