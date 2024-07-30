import React, { useEffect, useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { PreviewProps } from '../../../Type/ComponentBasedType'
import { Document } from 'react-pdf'
import '@react-pdf-viewer/core/lib/styles/index.css'

const Preview: React.FC<PreviewProps> = ({ s3Path, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const encryptedBase64Key = 'bXVzdGJlMTZieXRlc2tleQ=='
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [viewAccess, setViewAccess] = useState<boolean>(true)

  const convertBytetoUrl = (encryptedBase64: string) => {
    const mimeType = 'application/pdf'

    try {
      const binaryData = atob(encryptedBase64)
      const arrayBuffer = new ArrayBuffer(binaryData.length)
      const uint8Array = new Uint8Array(arrayBuffer)

      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i)
      }

      const blob = new Blob([uint8Array], { type: mimeType })
      const pdfUrl = URL.createObjectURL(blob)
      setPdfUrl(pdfUrl)
    } catch (error) {
      console.error('Error parsing decrypted JSON:', error)
    }
  }
  useEffect(() => {
    //@ts-expect-error
    if (typeof Promise?.withResolvers === 'undefined') {
      if (window)
        // @ts-expect-error This does not exist outside of polyfill which this is doing
        window.Promise.withResolvers = function () {
          let resolve, reject
          const promise = new Promise((res, rej) => {
            resolve = res
            reject = rej
          })
          return { promise, resolve, reject }
        }
    }
  })

  useEffect(() => {
    if (s3Path) {
      setLoading(true)
      convertBytetoUrl(s3Path)
    }
  }, [s3Path])

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
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}>
      <div style={{ height: '100vh' }}>
        abcd
        <Viewer fileUrl={'https://pdfobject.com/pdf/sample.pdf'} />
      </div>
    </Worker>
  )
  // return <Document file={'https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js'} />

  // return (
  //   <>
  //     <script src="~/js/libs/pdf.js"></script>
  //     <Sidebar visible position="right" style={{ width: '40vw' }} onHide={onClose}>
  //       {pdfUrl && (
  // <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}>
  //   <div style={{ height: '100vh' }}>
  //     <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
  //   </div>
  // </Worker>
  //       )}
  //     </Sidebar>
  //   </>
  // )
}

export default Preview
