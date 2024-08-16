import React, { useEffect, useRef, useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { convertBytetoUrl } from '../../Helper/Helper'
import { PreviewProps } from '../../../Type/ComponentBasedType'

const PDFEditor: React.FC<PreviewProps> = ({ fileData, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')
  const [textEntries, setTextEntries] = useState<{ text: string; x: number; y: number }[]>([])
  const [fontSize, setFontSize] = useState<any>(16)
  const [textColor, setTextColor] = useState({ r: 0, g: 0, b: 0 })
  const [newText, setNewText] = useState('')
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)
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

  const addTextEntry = (text: string, x: number, y: number) => {
    setTextEntries([...textEntries, { text, x, y }])
    setNewText('')
    setClickPosition(null)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = pdfRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setClickPosition({ x, y })
    }
  }

  const handleSave = async () => {
    if (!pdfUrl) return

    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    textEntries.forEach((entry) => {
      firstPage.drawText(entry.text, {
        x: entry.x,
        y: firstPage.getHeight() - entry.y,
        size: fontSize,
        color: rgb(textColor.r / 255, textColor.g / 255, textColor.b / 255),
      })
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)

    setPdfUrl(url)
  }

  const handleUndo = async () => {
    if (textEntries.length === 0) return

    // Remove the last text entry
    const updatedEntries = textEntries.slice(0, -1)
    setTextEntries(updatedEntries)

    if (!pdfUrl) return

    // Re-generate the PDF with the updated text entries
    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    updatedEntries.forEach((entry) => {
      firstPage.drawText(entry.text, {
        x: entry.x,
        y: firstPage.getHeight() - entry.y,
        size: fontSize,
        color: rgb(textColor.r / 255, textColor.g / 255, textColor.b / 255),
      })
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)

    setPdfUrl(url) // Update the PDF URL to re-render the PDF
  }

  const handleDownload = () => {
    if (pdfUrl) {
      const a = document.createElement('a')
      a.href = pdfUrl
      a.download = 'edited.pdf'
      a.click()
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value)
  }

  const fontSizeOptions = [12, 14, 16, 18, 20].map((size) => ({ label: `${size}px`, value: size }))
  const fontFamilyOptions = [
    { label: 'Helvetica', value: StandardFonts.Helvetica },
    { label: 'Times Roman', value: StandardFonts.TimesRoman },
    { label: 'Courier', value: StandardFonts.Courier },
  ]

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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <div
            style={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f4f4f4',
              borderRadius: '8px',
              marginBottom: '10px',
            }}>
            <Button label="Save" icon="pi pi-save" onClick={handleSave} />
            <Button label="Undo" icon="pi pi-undo" onClick={handleUndo} />
            <Button label="Download" icon="pi pi-download" onClick={handleDownload} />
          </div>

          <div
            style={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f4f4f4',
              borderRadius: '8px',
              marginBottom: '10px',
            }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <InputText
                value={fontSize}
                type="number"
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{ width: '100px', marginRight: '10px' }}
              />

              <InputText
                value={newText}
                onChange={handleTextChange}
                placeholder="Enter text"
                style={{ flexGrow: 1 }}
              />
            </div>
            <Button
              label="Add Text"
              onClick={() => {
                if (clickPosition && newText) {
                  addTextEntry(newText, clickPosition.x, clickPosition.y)
                }
              }}
              style={{ marginLeft: '10px' }}
            />
          </div>

          <div ref={pdfRef} style={{ position: 'relative', height: '100%', overflow: 'auto' }}>
            {textEntries.map((entry, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: entry.x,
                  top: entry.y,
                  color: `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`,
                  fontSize: `${fontSize}px`,
                }}>
                {entry.text}
              </div>
            ))}
            <div onClick={handleClick} style={{ cursor: 'text', height: '100%' }}>
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                <Viewer fileUrl={pdfUrl} />
              </Worker>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  )
}

export default PDFEditor
