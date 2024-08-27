import React, { useEffect, useRef, useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { usePDF } from 'react-to-pdf'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { convertBytetoUrl } from '../../Helper/Helper'
import { PreviewProps } from '../../../Type/ComponentBasedType'

const PDFEditor: React.FC<PreviewProps> = ({ fileData, fileName, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')
  const [textEntries, setTextEntries] = useState<{ text: string; x: number; y: number }[]>([])
  const [fontSize, setFontSize] = useState<any>(16)
  const [newText, setNewText] = useState('')
  const [isDownloadVisible, setIsDownloadVisible] = useState(false)
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)
  const [isAddTextVisible, setIsAddTextVisible] = useState(false) // State to control visibility of Add Text feature
  const { toPDF, targetRef } = usePDF({
    filename: fileName,
  })
  const pdfRef = useRef<HTMLDivElement>(null)

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

  const handleAddText = () => {
    if (clickPosition && newText) {
      ;(window as any).globalHandler(newText)
      addTextEntry(newText, clickPosition.x, clickPosition.y)
      setIsDownloadVisible(true) // Show download button after adding text
    }
  }

  const addTextEntry = (text: string, x: number, y: number) => {
    setTextEntries([...textEntries, { text, x, y }])
    setNewText('')
    setClickPosition(null)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsAddTextVisible(true)
    const rect = pdfRef.current?.getBoundingClientRect()

    if (rect) {
      const scaleX = pdfRef.current ? pdfRef.current.clientWidth / rect.width : 1
      const scaleY = pdfRef.current ? pdfRef.current.clientHeight / rect.height : 1

      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY - 5

      // Visual indicator
      const marker = document.createElement('span')
      marker.style.position = 'absolute'
      marker.style.left = `${x}px`
      marker.style.top = `calc(${y}px - 16px)`

      const globalHandler = (text: string) => {
        marker.innerHTML = text
        pdfRef.current?.appendChild(marker)
      }
      ;(window as any).globalHandler = globalHandler
      setClickPosition({ x, y })
    }
  }

  const handleDownload = () => {
    if (pdfUrl) {
      toPDF()
      const a = document.createElement('a')
      a.href = pdfUrl
      a.download = 'edited.pdf'
      a.click()
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value)
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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
          {/* Text and Font Size Controls - Visible only after Add Text is clicked */}
          {isAddTextVisible && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: '8px',
                  marginBottom: '15px',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <InputText
                    value={fontSize}
                    type="number"
                    onChange={(e) => setFontSize(Number(e.target.value))}
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
                    onChange={handleTextChange}
                    placeholder="Enter text"
                    style={{
                      flexGrow: 1,
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>

                {/* Add Text Button */}
                <Button
                  label="Add Text"
                  onClick={handleAddText}
                  // className="p-button-outlined"
                  style={{
                    marginLeft: '20px',
                    marginRight: '10px',
                    padding: '8px 12px',
                    height: '38px',
                    lineHeight: '22px',
                  }}
                />

                {/* Download Button - Visible only after adding text */}
                {isDownloadVisible && (
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
                )}
              </div>
            </>
          )}

          {/* PDF Viewer with Text Entries */}
          <div ref={targetRef} style={{ flexGrow: 1, overflow: 'auto', position: 'relative' }}>
            <div ref={pdfRef} style={{ position: 'relative', height: '100%' }}>
              {textEntries.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: entry.x,
                    top: entry.y,
                    color: '#000',
                    fontSize: `${fontSize}px`,
                  }}>
                  {entry.text}
                </div>
              ))}
              <div
                onClick={handleClick}
                style={{
                  cursor: 'text',
                  position: 'relative',
                  height: '100%',
                  zoom: (window.outerWidth - window.innerWidth) / window.outerWidth,
                }}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                  <Viewer fileUrl={pdfUrl} />
                </Worker>
              </div>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  )
}

export default PDFEditor
