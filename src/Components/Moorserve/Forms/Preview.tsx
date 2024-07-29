import { useEffect, useState, useRef } from 'react'
import { Sidebar } from 'primereact/sidebar'
import CryptoJS from 'crypto-js'
import { ProgressSpinner } from 'primereact/progressspinner'

interface PreviewProps {
  s3Path: string
  onClose: () => void
}

const Preview: React.FC<PreviewProps> = ({ s3Path, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const encryptedBase64Key = 'bXVzdGJlMTZieXRlc2tleQ=='
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [viewAccess, setViewAccess] = useState<boolean>(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const interval = useRef<NodeJS.Timeout | null>(null)

  const convertBytetoUrl = (encryptedBase64: string) => {
    const mimeType = 'application/pdf'
    const parsedBase64key = CryptoJS.enc.Base64.parse(encryptedBase64Key)
    const decryptedData = CryptoJS.AES.decrypt(encryptedBase64, parsedBase64key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })
    try {
      const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8)
      const binaryData = atob(decryptedText)
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
    const docRights = JSON.parse(localStorage.getItem('docRights') || '[]')
    const hasDownloadAccess = docRights.some((item: any) => item.name === 'Download')
    setViewAccess(hasDownloadAccess)
  }, [])

  //   useEffect(() => {
  //     setLoading(true)
  //     requestApi(`/v1/oms/enquiry/download?s3FilePath=${s3Path}`)
  //       .then((res) => {
  //         setLoading(false)
  //         convertBytetoUrl(res.bytes)
  //       })
  //       .catch((err) => {
  //         console.log('Error:', err)
  //         setLoading(false)
  //       })
  //   }, [s3Path])

  const clearCheckingInterval = () => {
    if (interval.current) {
      clearInterval(interval.current)
    }
  }

  const onIframeLoaded = () => {
    clearCheckingInterval()
  }

  useEffect(() => {
    interval.current = setInterval(() => {
      try {
        if (iframeRef.current && iframeRef.current.contentWindow?.document.body.innerHTML === '') {
          iframeRef.current.src = pdfUrl || ''
        }
      } catch (e) {
        onIframeLoaded()
      }
    }, 2000)

    return clearCheckingInterval
  }, [pdfUrl])

  if (!viewAccess) {
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
          Access denied as user does not have Download rights
        </div>
      </Sidebar>
    )
  }

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
      <iframe
        ref={iframeRef}
        title="PDF Viewer"
        src={pdfUrl || ''}
        width="100%"
        height="100%"
        style={{ border: '1px solid black' }}
        onLoad={onIframeLoaded}
      />
    </Sidebar>
  )
}

export default Preview
