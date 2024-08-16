import React, { useState, useRef } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

const PdfEditor = () => {
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null)
  const [inputText, setInputText] = useState<string>('')
  const [fontSize, setFontSize] = useState<number>(16)
  const [fontFamily, setFontFamily] = useState<keyof typeof StandardFonts>('Helvetica')
  const [textColor, setTextColor] = useState({ r: 0, g: 0, b: 0 })
  const textEntries = useRef<Array<{ text: string; x: number; y: number }>>([])

  const loadPdf = async () => {
    const url = '/path-to-your-pdf-template/Bourne-Inspection-Form.pdf' // Update with your PDF template path
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer())
    setPdfBytes(new Uint8Array(existingPdfBytes))
  }

  const addText = async (text: string, x: number, y: number) => {
    if (!pdfBytes) return

    const pdfDoc = await PDFDocument.load(pdfBytes)
    const font = await pdfDoc.embedFont(StandardFonts[fontFamily])
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    firstPage.drawText(text, {
      x,
      y,
      size: fontSize,
      font: font,
      color: rgb(textColor.r / 255, textColor.g / 255, textColor.b / 255),
    })

    textEntries.current.push({ text, x, y })
    const modifiedPdfBytes = await pdfDoc.save()
    setPdfBytes(new Uint8Array(modifiedPdfBytes))
  }

  const undoLastText = async () => {
    if (textEntries.current.length === 0 || !pdfBytes) return

    const lastEntry = textEntries.current.pop()
    // Recreate PDF without the last text entry
    const pdfDoc = await PDFDocument.load(pdfBytes)
    const font = await pdfDoc.embedFont(StandardFonts[fontFamily])
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    textEntries.current.forEach((entry) => {
      firstPage.drawText(entry.text, {
        x: entry.x,
        y: entry.y,
        size: fontSize,
        font: font,
        color: rgb(textColor.r / 255, textColor.g / 255, textColor.b / 255),
      })
    })

    const modifiedPdfBytes = await pdfDoc.save()
    setPdfBytes(new Uint8Array(modifiedPdfBytes))
  }

  const clearText = () => {
    textEntries.current = []
    loadPdf() // Reload the original PDF without any added text
  }

  const savePdf = () => {
    if (pdfBytes) {
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'modified-form.pdf')
    }
  }

  const handleTextInput = () => {
    const x = 50 // X coordinate where the text will be placed
    const y = 700 // Y coordinate where the text will be placed
    addText(inputText, x, y)
  }

  React.useEffect(() => {
    loadPdf()
  }, [])

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Your text here"
        />
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          placeholder="Font Size"
        />
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value as keyof typeof StandardFonts)}>
          <option value="Helvetica">Helvetica</option>
          <option value="TimesRoman">Times Roman</option>
          {/* Add other font options */}
        </select>

        <input
          type="color"
          value={`#${((1 << 24) + (textColor.r << 16) + (textColor.g << 8) + textColor.b)
            .toString(16)
            .slice(1)}`}
          onChange={(e) => {
            const hex = e.target.value
            setTextColor({
              r: parseInt(hex.slice(1, 3), 16),
              g: parseInt(hex.slice(3, 5), 16),
              b: parseInt(hex.slice(5, 7), 16),
            })
          }}
        />
        <button onClick={handleTextInput}>Add Text</button>
        <button onClick={undoLastText}>Undo</button>
        <button onClick={clearText}>Clear</button>
        <button onClick={savePdf}>Save</button>
      </div>

      <div>
        {pdfBytes && (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
            <Viewer fileUrl={pdfBytes} />
          </Worker>
        )}
      </div>
    </div>
  )
}

export default PdfEditor
