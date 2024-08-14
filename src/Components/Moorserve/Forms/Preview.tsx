// import React, { useEffect, useState } from 'react'
// import { Sidebar } from 'primereact/sidebar'
// import { ProgressSpinner } from 'primereact/progressspinner'
// import { Worker, Viewer } from '@react-pdf-viewer/core'
// import { PreviewProps } from '../../../Type/ComponentBasedType'
// import '@react-pdf-viewer/core/lib/styles/index.css'
// import { convertBytetoUrl } from '../../Helper/Helper'

// const Preview: React.FC<PreviewProps> = ({ fileData, onClose }) => {
//   const [loading, setLoading] = useState<boolean>(false)
//   const [pdfUrl, setPdfUrl] = useState<string>('')

//   useEffect(() => {
//     if (fileData) {
//       setLoading(true)
//       const dummyURl = convertBytetoUrl(fileData)
//       setPdfUrl(dummyURl)
//     }
//   }, [fileData])

//   useEffect(() => {
//     if (pdfUrl) {
//       setLoading(false)
//     }
//   }, [pdfUrl])

//   if (loading) {
//     return (
//       <Sidebar visible position="right" style={{ width: '40vw' }} onHide={onClose}>
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
//       </Sidebar>
//     )
//   }

//   if (!loading && pdfUrl === null) {
//     return (
//       <Sidebar visible position="right" style={{ width: '40vw' }} onHide={onClose}>
//         <div
//           style={{
//             height: '100vh',
//             fontSize: 14,
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           Failed to load content
//         </div>
//       </Sidebar>
//     )
//   }

//   return (
//     <Sidebar visible position="right" style={{ width: '40vw' }} onHide={onClose}>
//       <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
//         <div style={{ height: '100vh' }}>
//           <Viewer fileUrl={pdfUrl} />
//         </div>
//       </Worker>
//     </Sidebar>
//   )
// }

// export default Preview

import React, { useEffect, useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { PreviewProps } from '../../../Type/ComponentBasedType'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { convertBytetoUrl } from '../../Helper/Helper'
import { MenuBar } from './ViewPdf/components/MenuBar'
import { Pdf, usePdf } from './ViewPdf/hooks/usePdf'
import { useAttachments } from './ViewPdf/hooks/useAttachments'
import { ggID } from './ViewPdf/utils/helpers'
import { AttachmentTypes } from './ViewPdf/entities'
import { UploadTypes, useUploader } from './ViewPdf/hooks/useUploader'
// import 'semantic-ui-css/semantic.min.css'
import { prepareAssets } from './ViewPdf/utils/prepareAssets'

const Preview: React.FC<PreviewProps> = ({ fileData, onClose }) => {
  const [helpModalOpen, setHelpModalOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [pdfUrl, setPdfUrl] = useState<string>('')
  const { file, initialize, isSaving, savePdf } = usePdf()
  const {
    add: addAttachment,
    allPageAttachments,
    pageAttachments,
    reset: resetAttachments,
    update,
    remove,
    setPageIndex,
  } = useAttachments()

  const initializePageAndAttachments = (pdfDetails: Pdf) => {
    initialize(pdfDetails)
    const numberOfPages = pdfDetails.pages.length
    resetAttachments(numberOfPages)
  }

  useEffect(() => {
    prepareAssets()
  }, [])

  useEffect(() => {
    if (fileData) {
      setLoading(true)
      const dummyURl = convertBytetoUrl(fileData)
      setPdfUrl(dummyURl)
    }
  }, [fileData])

  const handleSavePdf = () => savePdf(allPageAttachments)

  const {
    inputRef: pdfInput,
    handleClick: handlePdfClick,
    isUploading,
    onClick,
    upload: uploadPdf,
  } = useUploader({
    use: UploadTypes.PDF,
    afterUploadPdf: initializePageAndAttachments,
  })
  const {
    inputRef: imageInput,
    handleClick: handleImageClick,
    onClick: onImageClick,
    upload: uploadImage,
  } = useUploader({
    use: UploadTypes.IMAGE,
    afterUploadAttachment: addAttachment,
  })

  const addText = () => {
    const newTextAttachment: TextAttachment = {
      id: ggID(),
      type: AttachmentTypes.TEXT,
      x: 100,
      y: 100,
      width: 120,
      height: 25,
      size: 16,
      lineHeight: 1.4,
      fontFamily: 'Times-Roman',
      text: 'Enter Text Here',
    }
    addAttachment(newTextAttachment)
    alert('I am Called')
  }
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
          {/* <MenuBar
            openHelp={() => setHelpModalOpen(true)}
            savePdf={handleSavePdf}
            addText={addText}
            savingPdfStatus={isSaving}
            uploadNewPdf={handlePdfClick}
            isPdfLoaded={!!file}
          /> */}
          <Viewer fileUrl={pdfUrl} />
        </div>
      </Worker>
    </Sidebar>
  )
}

export default Preview
