import React, { useEffect, useRef, useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { convertBytetoUrl } from '../../Helper/Helper'
import { PreviewProps } from '../../../Type/ComponentBasedType'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { usePDF } from 'react-to-pdf'

const PDFEditor: React.FC<PreviewProps> = ({ fileData, fileName, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')
  const [textEntries, setTextEntries] = useState<
    { text: string; x: number; y: number; page: number }[]
  >([])
  const [fontSize, setFontSize] = useState<any>(16)
  const [newText, setNewText] = useState('')
  const [isDownloadVisible, setIsDownloadVisible] = useState(false)
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number; page: number } | null>(
    null,
  )
  const [isAddTextVisible, setIsAddTextVisible] = useState(false)
  const { toPDF, targetRef } = usePDF({
    filename: fileName,
  })
  const pdfRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1) // Track the current page

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
      addTextEntry(newText, clickPosition.x, clickPosition.y, clickPosition.page)
      setIsDownloadVisible(true)
    }
  }

  const addTextEntry = (text: string, x: number, y: number, page: number) => {
    setTextEntries([...textEntries, { text, x, y, page }])
    setNewText('')
    setClickPosition(null)
  }

  const handleClicks = (e: React.MouseEvent<HTMLDivElement>) => {
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
      setClickPosition({ x, y, page: currentPage }) // Save click position with the page number
    }
  }

  const handlePageChange = (e: any) => {
    setCurrentPage(e.pageIndex + 1)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsAddTextVisible(true)
    const rect = pdfRef.current?.getBoundingClientRect()

    if (rect) {
      const scaleX = pdfRef.current ? pdfRef.current.clientWidth / rect.width : 1
      const scaleY = pdfRef.current ? pdfRef.current.clientHeight / rect.height : 1

      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY - 5

      // Save click position with the current page number
      const marker = document.createElement('span')
      marker.style.position = 'absolute'
      marker.style.left = `${x}px`
      marker.style.top = `calc(${y}px - 16px)`

      const globalHandler = (text: string) => {
        marker.innerHTML = text
        pdfRef.current?.appendChild(marker)
      }
      ;(window as any).globalHandler = globalHandler
      setClickPosition({ x, y, page: currentPage })
    }
  }

  const handleDownload = async () => {
    if (pdfUrl && textEntries.length > 0) {
      toPDF()
      try {
        const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const pages = pdfDoc.getPages()
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

        textEntries.forEach((entry) => {
          const page = pages[entry.page - 1]
          if (page) {
            page.drawText(entry.text, {
              x: entry.x,
              y: page.getHeight() - entry.y - fontSize, // Adjust y position
              size: fontSize,
              font: font,
              color: rgb(0, 0, 0),
            })
          } else {
            console.warn(`Page ${entry.page} does not exist in the document.`)
          }
        })

        const pdfBytes = await pdfDoc.save()

        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()

        URL.revokeObjectURL(url)
      } catch (error) {
        console.error('An error occurred while downloading the PDF:', error)
        alert('An error occurred while downloading the PDF. Please try again.')
      }
    } else {
      alert('No text entries to add or no PDF loaded.')
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value)
  }

  const renderTextEntries = () => {
    const currentPageTextEntries = textEntries.filter((entry) => entry.page === currentPage)
    return currentPageTextEntries.map((entry, index) => (
      <div
        key={index}
        style={{
          position: 'absolute',
          left: `${entry.x}px`,
          top: `${entry.y}px`,
          color: '#000',
          fontSize: `${fontSize}px`,
          transform: `scale(${1 / window.outerWidth})`, // Adjusting for scale
          transformOrigin: 'top left', // Ensures the scaling originates from the top left
          pointerEvents: 'none', // Makes sure the text is not interactable
        }}>
        {entry.text}
      </div>
    ))
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

          <div ref={targetRef} style={{ flexGrow: 1, overflow: 'auto', position: 'relative' }}>
            <div ref={pdfRef} style={{ position: 'relative', height: '100%' }}>
              {renderTextEntries()}
              <div
                onClick={handleClick}
                style={{
                  cursor: 'text',
                  position: 'relative',
                  height: '100%',
                  zoom: (window.outerWidth - window.innerWidth) / window.outerWidth,
                }}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                  <Viewer fileUrl={pdfUrl} onPageChange={handlePageChange} />
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
