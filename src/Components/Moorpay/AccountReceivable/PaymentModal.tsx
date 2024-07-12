import React, { useState } from 'react'
import { PaymentModalProps } from '../../../Type/ComponentBasedType'
import InputComponent from '../../CommonComponent/InputComponent'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'

// Function to format credit card number
function cc_format(value: string) {
  const v = value
    .replace(/\s+/g, '')
    .replace(/[^0-9]/gi, '')
    .substr(0, 16)
  const parts = []

  for (let i = 0; i < v.length; i += 4) {
    parts.push(v.substr(i, 4))
  }

  return parts.length > 1 ? parts.join(' ') : value
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onHide, onSavePayment }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardholderName: '',
    amount: '',
    paymentOption: '',
    cardNumber: '',
    expirationDate: null as Date | null,
    cvv: '',
  })

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (field: string, value: string) => {
    // Apply card number formatting
    if (field === 'cardNumber') {
      value = cc_format(value)
    }

    setPaymentDetails({ ...paymentDetails, [field]: value })
    setFieldErrors({ ...fieldErrors, [field]: '' })
  }

  const handleDateChange = (field: string, value: Date | null | undefined) => {
    setPaymentDetails({ ...paymentDetails, [field]: value || null })
    setFieldErrors({ ...fieldErrors, [field]: '' })
  }

  const validateFields = () => {
    const errors: { [key: string]: string } = {}
    const cardNumberPattern = /^[0-9]{16}$/
    const cvvPattern = /^[0-9]{3,4}$/
    if (!paymentDetails.cardholderName) errors.cardholderName = 'Cardholder name is required'
    if (!paymentDetails.amount) errors.amount = 'Amount is required'
    if (!paymentDetails.paymentOption) errors.paymentOption = 'Payment option is required'
    if (!paymentDetails.cardNumber) {
      errors.cardNumber = 'Card number is required'
    } else if (!cardNumberPattern.test(paymentDetails.cardNumber)) {
      errors.cardNumber = 'Card number must be 16 digits'
    }
    if (!paymentDetails.expirationDate) errors.expirationDate = 'Expiration date is required'
    if (!paymentDetails.cvv) {
      errors.cvv = 'CVV is required'
    } else if (!cvvPattern.test(paymentDetails.cvv)) {
      errors.cvv = 'CVV must be 3 or 4 digits'
    }

    setFieldErrors(errors)
    return errors
  }

  const handleSavePayment = () => {
    const errors = validateFields()
    if (Object.keys(errors).length === 0) {
      // onSavePayment(paymentDetails); // Pass payment details to parent component
      // onHide();
    }
  }
  return (
    <div className="flex gap-8">
      <div className="w-[300px], h-[400px]">
        <div className="flex flex-col gap-24">
          <div className="mt-4">
            <img
              src="/assets/images/moorfindLogo.png"
              alt="Logo"
              className="mx-auto w-56 h-16 mb-5"
              id="logo"
            />
          </div>
          <div className="mt-">
            <img
              src="/assets/images/card.jpg"
              alt="Logo"
              className="mx-auto w-56 h-18 mb-5"
              id="logo"
            />
          </div>
        </div>
      </div>

      <div style={{ width: '500px', height: '400px', backgroundColor: '' }}>
        <div>
          <div className="flex gap-6">
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Cardholder's name
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-2">
                <InputComponent
                  value={paymentDetails.cardholderName}
                  placeholder="John Doe"
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.cardholderName ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
                <p className="" id="cardholderName">
                  {fieldErrors.cardholderName && (
                    <small className="p-error">{fieldErrors.cardholderName}</small>
                  )}
                </p>
              </div>
            </div>

            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Amount:
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-2">
                <InputComponent
                  value={paymentDetails.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.amount ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
                <p className="" id="amount">
                  {fieldErrors.amount && <small className="p-error">{fieldErrors.amount}</small>}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="mt-4">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Payment Options
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-2">
                <Dropdown
                  id="paymentOption"
                  value={paymentDetails.paymentOption}
                  options={[
                    { label: 'Credit Card', value: 'Credit Card' },
                    { label: 'Debit Card', value: 'Debit Card' },
                    { label: 'PayPal', value: 'PayPal' },
                  ]}
                  onChange={(e) => handleInputChange('paymentOption', e.value)}
                  optionLabel="label"
                  placeholder="Select payment option"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.paymentOption ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    color: 'black',
                  }}
                />
                <p className="" id="paymentOption">
                  {fieldErrors.paymentOption && (
                    <small className="p-error">{fieldErrors.paymentOption}</small>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Card Number
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-2">
                <InputComponent
                  value={paymentDetails.cardNumber}
                  placeholder="Enter your Card Number"
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.cardNumber ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
                <p className="" id="cardNumber">
                  {fieldErrors.cardNumber && (
                    <small className="p-error">{fieldErrors.cardNumber}</small>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="mt-4">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Expiration Date
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-2">
                <Calendar
                  value={paymentDetails.expirationDate}
                  placeholder="mm/dd/yy"
                  onChange={(e) => handleDateChange('expirationDate', e.value)}
                  dateFormat="mm/dd/yy"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.expirationDate ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    padding: '0.5rem',
                    backgroundColor: 'white',
                  }}
                />
                <p className="" id="expirationDate">
                  {fieldErrors.expirationDate && (
                    <small className="p-error">{fieldErrors.expirationDate}</small>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  CVV
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-2">
                <InputComponent
                  value={paymentDetails.cvv}
                  placeholder="CVV"
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: fieldErrors.cvv ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
                <p className="" id="cvv">
                  {fieldErrors.cvv && <small className="p-error">{fieldErrors.cvv}</small>}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-6 ml-1 mt-20">
            <Button
              className="w-42 h-12 rounded-md text-sm"
              label="CONFIRM AND PAY"
              severity="success"
              onClick={handleSavePayment}
              raised
            />
            <Button
              className="rounded-md text-sm"
              label="CANCEL"
              severity="danger"
              onClick={onHide}
              text
              raised
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
