// import React, { useEffect, useRef, useState } from 'react'
// import { Sidebar } from 'primereact/sidebar'
// import { ProgressSpinner } from 'primereact/progressspinner'
// import { Button } from 'primereact/button'
// import { InputText } from 'primereact/inputtext'
// import { Worker, Viewer } from '@react-pdf-viewer/core'
// import '@react-pdf-viewer/core/lib/styles/index.css'
// import { convertBytetoUrl } from '../../Helper/Helper'
// import { PreviewProps } from '../../../Type/ComponentBasedType'
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
// import { usePDF } from 'react-to-pdf'
// import { set } from 'lodash'

// const PDFEditor: React.FC<PreviewProps> = ({ fileData, fileName, onClose }) => {
//   const [loading, setLoading] = useState(false)
//   const [pdfUrl, setPdfUrl] = useState('')
//   const [textEntries, setTextEntries] = useState<
//     { text: string; x: number; y: number; size: number }[]
//   >([])
//   const [fontSize, setFontSize] = useState<any>(16)
//   const [newText, setNewText] = useState('')
//   const [isDownloadVisible, setIsDownloadVisible] = useState(false)
//   const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)
//   const [isAddTextVisible, setIsAddTextVisible] = useState(false)
//   const { toPDF, targetRef } = usePDF({
//     filename: fileName,
//   })
//   const pdfRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (fileData) {
//       setLoading(true)
//       const dummyUrl = convertBytetoUrl(fileData)
//       setPdfUrl(dummyUrl)
//     }
//   }, [fileData])

//   useEffect(() => {
//     if (pdfUrl) {
//       setLoading(false)
//     }
//   }, [pdfUrl])

//   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     setIsAddTextVisible(true)
//     const rect = pdfRef.current?.getBoundingClientRect()
//     if (rect) {
//       const x = e.clientX - rect.left
//       const y = e.clientY - rect.top + 5
//       console.log('Click Position:', { x, y })
//       setClickPosition({ x, y })
//     }
//   }

//   const handleAddText = () => {
//     if (clickPosition && newText) {
//       const newEntries = [
//         ...textEntries,
//         { text: newText, x: clickPosition.x, y: clickPosition.y, size: fontSize },
//       ]
//       console.log('Text Entries:', newEntries)
//       setTextEntries(newEntries)
//       setNewText('')
//       setFontSize(fontSize)
//       setClickPosition(null)
//       setIsDownloadVisible(true)
//     }
//   }

//   const handleDownload = () => {
//     if (pdfUrl) {
//       toPDF()
//       const a = document.createElement('a')
//       a.href = pdfUrl
//       a.download = fileName
//       a.click()
//     }
//   }

//   return (
//     <Sidebar visible position="right" style={{ width: '40vw' }} onHide={onClose}>
//       {loading ? (
//         <div
//           style={{
//             height: '100vh',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <ProgressSpinner
//             style={{ width: '50px', height: '50px' }}
//             strokeWidth="3"
//             animationDuration="1.5s"
//           />
//         </div>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
//           {isAddTextVisible && (
//             <>
// <div
//   style={{
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderRadius: '8px',
//     marginBottom: '15px',
//   }}>
//   <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//     <InputText
//       value={fontSize}
//       type="number"
//       onChange={(e) => setFontSize(Number(e.target.value || 16))}
//       style={{
//         width: '64px',
//         marginRight: '10px',
//         borderRadius: '4px',
//         border: '1px solid #ccc',
//       }}
//       placeholder="Font Size"
//     />

//     <InputText
//       value={newText}
//       onChange={(e) => setNewText(e.target.value)}
//       placeholder="Enter text"
//       style={{
//         flexGrow: 1,
//         padding: '8px',
//         borderRadius: '4px',
//         border: '1px solid #ccc',
//       }}
//     />
//   </div>

//   <Button
//     label="Add Text"
//     onClick={handleAddText}
//     style={{
//       marginLeft: '20px',
//       marginRight: '10px',
//       padding: '8px 12px',
//       height: '38px',
//       lineHeight: '22px',
//     }}
//   />

//   {isDownloadVisible && (
//     <Button
//       label="Download"
//       icon="pi pi-download"
//       onClick={handleDownload}
//       style={{
//         marginRight: '-10px',
//         padding: '8px 12px',
//         height: '38px',
//         lineHeight: '22px',
//       }}
//     />
//   )}
// </div>
//             </>
//           )}

//           <div ref={targetRef} style={{ flexGrow: 1, overflow: 'auto', position: 'relative' }}>
//             <div ref={pdfRef} style={{ position: 'relative', height: '100%' }}>
//               <div
//                 onClick={handleClick}
//                 style={{
//                   cursor: 'text',
//                   position: 'relative',
//                   height: '100%',
//                   zoom: (window.outerWidth - window.innerWidth) / window.outerWidth,
//                 }}>
//                 <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
//                   <Viewer fileUrl={pdfUrl} />
//                 </Worker>
//                 {textEntries.map((entry, index) => (
//                   <span
//                     key={index}
//                     style={{
//                       position: 'absolute',
//                       left: `${entry.x}px`,
//                       top: `calc(${entry.y}px - ${entry.size}px)`,
//                       fontSize: `${entry.size}px`,
//                       color: 'black',
//                       whiteSpace: 'pre-wrap',
//                       transform: 'translate(-50%, -50%)',
//                     }}>
//                     {entry.text}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Sidebar>
//   )
// }

// export default PDFEditor

import React, { useEffect, useRef, useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { convertBytetoUrl } from '../../Helper/Helper'
import { PreviewProps } from '../../../Type/ComponentBasedType'
import { usePDF } from 'react-to-pdf'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'

const PDFEditor: React.FC<PreviewProps> = ({ fileData, fileName, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')
  const [newText, setNewText] = useState('')
  const [textSize, setTextSize] = useState<any>(16)
  const { toPDF, targetRef } = usePDF({ filename: fileName })
  const [textEntries, setTextEntries] = useState<
    { text: string; x: number; y: number; size: number }[]
  >([])
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)
  const pdfRef = useRef<HTMLDivElement>(null)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    if (fileData) {
      setLoading(true)
      const dummyUrl = convertBytetoUrl(fileData)
      setPdfUrl(dummyUrl)
    }
  }, [fileData])

  useEffect(() => {
    if (pdfUrl) {
      setLoading(false)
    }
  }, [pdfUrl])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = pdfRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top + 5
      setClickPosition({ x, y })
      setShowDialog(true)
    }
  }

  const handleAddText = () => {
    if (clickPosition && newText) {
      setTextEntries([
        ...textEntries,
        { text: newText, x: clickPosition.x, y: clickPosition.y, size: textSize },
      ])
      setNewText('')
      setTextSize(16)
      setClickPosition(null)
      setShowDialog(false)
    }
  }

  const handleDownload = () => {
    if (pdfUrl) {
      toPDF()
      const a = document.createElement('a')
      a.href = pdfUrl
      a.download = fileName
      a.click()
    }
  }

  return (
    <Sidebar visible position="right" style={{ width: '40vw' }} onHide={onClose}>
      {loading ? (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ProgressSpinner
            style={{ width: '50px', height: '50px' }}
            strokeWidth="3"
            animationDuration="1.5s"
          />
        </div>
      ) : (
        <>
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
            {/* <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '8px',
                marginBottom: '15px',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <InputText
                  value={textSize}
                  type="number"
                  onChange={(e) => setTextSize(Number(e.target.value || 16))}
                  style={{
                    width: '64px',
                    marginRight: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                  placeholder="Font Size"
                />

                <InputText
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Enter text"
                  style={{
                    flexGrow: 1,
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>

              <Button
                label="Add Text"
                onClick={handleAddText}
                style={{
                  marginLeft: '20px',
                  marginRight: '10px',
                  padding: '8px 12px',
                  height: '38px',
                  lineHeight: '22px',
                }}
              />

              <Button
                label="Download"
                icon="pi pi-download"
                onClick={handleDownload}
                style={{
                  marginRight: '-10px',
                  padding: '8px 12px',
                  height: '38px',
                  lineHeight: '22px',
                }}
              />
            </div> */}
            <div
              style={{
                position: 'fixed',
                top: '20px',
                right: '80px',
                bottom: '40px',
                zIndex: 1000,
              }}>
              <Button
                label="Download PDF"
                icon="pi pi-download"
                className="p-button-rounded p-button-info"
                onClick={handleDownload}
              />
            </div>

            <div ref={targetRef} style={{ flexGrow: 1, overflow: 'auto', position: 'relative' }}>
              <div ref={pdfRef} style={{ position: 'relative', height: '100%' }}>
                <div
                  onClick={handleClick}
                  style={{
                    cursor: 'text',
                    zoom: (window.outerWidth - window.innerWidth) / window.outerWidth,
                  }}>
                  <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfUrl} />
                  </Worker>
                  {textEntries.map((entry, index) => (
                    <span
                      key={index}
                      style={{
                        position: 'absolute',
                        left: `${entry.x}px`,
                        top: `calc(${entry.y}px - ${entry.size}px)`,
                        fontSize: `${entry.size}px`,
                        color: 'black',
                        whiteSpace: 'pre-wrap',
                        transform: 'translate(-50%, -50%)',
                      }}>
                      {entry.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Dialog
            header="Enter Text"
            visible={showDialog}
            style={{ width: '30vw' }}
            footer={
              <div>
                <Button label="Add" icon="pi pi-check" onClick={handleAddText} />
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  className="p-button-secondary"
                  onClick={() => setShowDialog(false)}
                />
              </div>
            }
            onHide={() => setShowDialog(false)}>
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <InputText
                value={textSize}
                type="number"
                onChange={(e) => setTextSize(Number(e.target.value || 16))}
                style={{
                  width: '64px',
                  marginRight: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
                placeholder="Font Size"
              />

              <InputText
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter text"
                style={{
                  flexGrow: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          </Dialog>
        </>
      )}
    </Sidebar>
  )
}

export default PDFEditor
