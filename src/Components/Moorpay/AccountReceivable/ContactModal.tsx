// ContactModal.tsx
import { useState } from 'react'
import { ContactModalProps } from '../../../Type/ComponentBasedType'

const ContactModal: React.FC<ContactModalProps> = ({ onHide, onSendEmail }) => {
  const [emailDetails, setEmailDetails] = useState({
    recipient: '',
    subject: '',
    message: '',
  })

  const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailDetails({ ...emailDetails, recipient: event.target.value })
  }

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailDetails({ ...emailDetails, subject: event.target.value })
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailDetails({ ...emailDetails, message: event.target.value })
  }

  const handleSendEmail = () => {
    onSendEmail(emailDetails) // Pass email details to parent component
    onHide()
  }

  return (
    <div>
      <h2>Contact Customer</h2>
      <label>
        Recipient:
        <input type="text" value={emailDetails.recipient} onChange={handleRecipientChange} />
      </label>
      <label>
        Subject:
        <input type="text" value={emailDetails.subject} onChange={handleSubjectChange} />
      </label>
      <label>
        Message:
        <textarea value={emailDetails.message} onChange={handleMessageChange} />
      </label>
      <button onClick={handleSendEmail}>Send Email</button>
      <button onClick={onHide}>Cancel</button>
    </div>
  )
}

export default ContactModal
