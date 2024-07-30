import React, { useEffect, useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { PreviewProps } from '../../../Type/ComponentBasedType'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { convertBytetoUrl } from '../../Helper/Helper'

const Preview: React.FC<PreviewProps> = ({ fileData, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [pdfUrl, setPdfUrl] = useState<string>('')

  useEffect(() => {
    if (fileData) {
      setLoading(true)
      const dummyURl = convertBytetoUrl(fileData)
      setPdfUrl(dummyURl)
    }
  }, [fileData])

  useEffect(() => {
    if (pdfUrl) {
      setLoading(false)
    }
  }, [pdfUrl])

  if (loading) {
    return (
      <Sidebar visible position="right" style={{ width: '40vw' }} onHide={onClose}>
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
      </Sidebar>
    )
  }

  if (!loading && pdfUrl === null) {
    return (
      <Sidebar visible position="right" style={{ width: '40vw' }} onHide={onClose}>
        <div
          style={{
            height: '100vh',
            fontSize: 14,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Failed to load content
        </div>
      </Sidebar>
    )
  }

  return (
    <Sidebar visible position="right" style={{ width: '40vw' }} onHide={onClose}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
        <div style={{ height: '100vh' }}>
          <Viewer fileUrl={pdfUrl} />
        </div>
      </Worker>
    </Sidebar>
  )
}

export default Preview
