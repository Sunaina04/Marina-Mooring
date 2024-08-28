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
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

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

  const handleDownload = async () => {
    if (pdfUrl) {
      toPDF()
      const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)

      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages()

      textEntries.forEach((entry) => {
        pages.forEach((page) => {
          const { height: pageHeight } = page.getSize()

          if (entry.y <= pageHeight) {
            page.drawText(entry.text, {
              x: entry.x,
              y: pageHeight - entry.y,
              size: entry.size,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            })
          }

          entry.y = entry.y > pageHeight ? entry.y - pageHeight : entry.y
        })
      })

      const pdfBytes = await pdfDoc.save()

      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      link.click()
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
            <div
              style={{
                position: 'fixed',
                top: '20px',
                right: '80px',
                bottom: '40px',
                zIndex: 1000,
                height: '40px',
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
