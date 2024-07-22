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
    // const errors = validateFields()
    // if (Object.keys(errors).length === 0) {
    //   // onSavePayment(paymentDetails); // Pass payment details to parent component
    //   // onHide();
    // }
  }

  return (
    <div>
      <div className="flex gap-6">
        <div className="mt-">
          <span className="font-medium text-sm text-[#000000]">
            <div className="flex gap-1">
              Type
              <p className="text-red-600">*</p>
            </div>
          </span>
          <div className="mt-2">
            <Dropdown
              id="paymentOption"
              value={paymentDetails.paymentOption}
              options={[
                { label: 'Card', value: 'Card' },
                { label: 'Check', value: 'Check' },
                { label: 'Cash', value: 'Cash' },
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

      <div className="flex gap-6 ml-1 mt-40">
<<<<<<< Updated upstream
        <div
          className={`"flex gap-6 bottom-2 absolute left-7"`}
          style={{
            width: '100%',
            height: '65px',
            backgroundColor: 'white',
            padding: '0 12px',
            bottom: '0px',
          }}>
          <Button
            label={'Save'}
            onClick={handleSavePayment}
            style={{
              width: '89px',
              height: '42px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontWeight: 'bolder',
              fontSize: '1rem',
              boxShadow: 'none',
              color: 'white',
              borderRadius: '0.50rem',
              marginTop: '4px',
            }}
          />

          <Button
            onClick={onHide}
            label="CANCEL"
            severity="danger"
            text={true}
            style={{
              backgroundColor: 'white',
              color: '#000000',
              border: 'none',
              width: '89px',
              height: '42px',
              marginTop: '4px',
            }}
          />
        </div>
=======
        
      <div
        className={`"flex gap-6 bottom-2 absolute left-7"`}
        style={{
          width: '100%',
          height: '65px',
          backgroundColor: 'white',
          padding: '0 12px',
          bottom: '0px',
        }}>

<Button
          label={'Save'}
          onClick={handleSavePayment}
          style={{
            width: '89px',
            height: '42px',
            backgroundColor: '#0098FF',
            cursor: 'pointer',
            fontWeight: 'bolder',
            fontSize: '1rem',
            boxShadow: 'none',
            color: 'white',
            borderRadius: '0.50rem',
            marginTop: '4px',
          }}
        />
          {/* <Button
          className="w-24 h-12 rounded-md text-lg"
          label="Save"
          severity="success"
          onClick={handleSavePayment}
          raised
        /> */}

<Button
         onClick={onHide}
          label="CANCEL"
          severity="danger"
          text={true}
          style={{
            backgroundColor: 'white',
            color: '#000000',
            border: 'none',
            width: '89px',
            height: '42px',
            marginTop: '4px',
          }}
        />
        {/* <Button
          className="rounded-md text-sm"
          label="CANCEL"
          severity="danger"
          onClick={onHide}
          text
          raised
        />
       */}
>>>>>>> Stashed changes
      </div>
</div>
    </div>
  )
}

export default PaymentModal
