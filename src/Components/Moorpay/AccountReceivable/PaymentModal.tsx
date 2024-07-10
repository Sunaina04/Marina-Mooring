// PaymentModal.tsx
import { useState } from 'react'
import { PaymentModalProps } from '../../../Type/ComponentBasedType'

const PaymentModal: React.FC<PaymentModalProps> = ({ onHide, onSavePayment }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    type: '',
  })

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({ ...paymentDetails, amount: event.target.value })
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({ ...paymentDetails, type: event.target.value })
  }

  const handleSavePayment = () => {
    onSavePayment(paymentDetails) // Pass payment details to parent component
    onHide()
  }

  return (
    <div>
      <h2>Enter Payment Details</h2>
      <label>
        Amount:
        <input type="text" value={paymentDetails.amount} onChange={handleAmountChange} />
      </label>
      <label>
        Type:
        <input type="text" value={paymentDetails.type} onChange={handleTypeChange} />
      </label>
      <button onClick={handleSavePayment}>Save Payment</button>
      <button onClick={onHide}>Cancel</button>
    </div>
  )
}

export default PaymentModal
