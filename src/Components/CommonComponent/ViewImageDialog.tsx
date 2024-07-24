import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { ViewImageProps } from '../../Type/ComponentBasedType'

const ViewImageDialog: React.FC<ViewImageProps> = ({
  imageVisible,
  setImageVisible,
  showImage,
}) => {
  const [scale, setScale] = useState(1)

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1)
  }

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1))
  }

  const ButtonStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
  }

  return (
    <Dialog
      position="center"
      style={{
        width: '740px',
        minWidth: '300px',
        height: '500px',
        borderRadius: '1rem',
        fontWeight: '400',
        cursor: 'alias',
      }}
      draggable={false}
      visible={imageVisible}
      onHide={() => {
        setImageVisible(false)
        setScale(1)
      }}
      headerStyle={{ cursor: 'alias' }}
      header="Images">
      <div>
        <hr className="border border-[#000000] my-0 mx-0" />
      </div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '90%',
          overflow: 'auto',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              transition: 'transform 0.2s',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <img
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
                display: 'block',
              }}
              src={`data:image/jpeg;base64,${showImage.imageData}`}
            />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            display: 'flex',
            gap: '10px',
          }}>
          <button onClick={handleZoomIn} style={ButtonStyle}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#007bff" />
              <path
                d="M12 5v14M5 12h14"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button onClick={handleZoomOut} style={ButtonStyle}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#007bff" />
              <path
                d="M5 12h14"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export default ViewImageDialog
