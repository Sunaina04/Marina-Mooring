import { Button } from 'primereact/button'
import React, { useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { InputText } from 'primereact/inputtext'

const AddImage = () => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div>
      <div className={isLoading ? 'blurred' : ''}>
        <div

        // style={{border:"1px solid red"}}
        >
          <div className="mt-5 ml-3">
            <div className="ml-1 text-black font-semibold text-sm">
              <span style={{ fontWeight: '400', fontSize: '14px', color: '#000000' }}>
                <div className="flex gap-1">
                  Image Name
                  <p className="text-red-600">*</p>
                </div>
              </span>
            </div>
            <div className="mt-2">
              <InputText
                //   value={formData.accountNumber}
                //   onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                type="text"
                style={{
                  width: '230px',
                  height: '32px',
                  // border: fieldErrors.accountNumber ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.70rem',
                  padding: '1em',
                }}
              />
              <p>
                {/* {fieldErrors.accountNumber && (
                <small className="p-error">{fieldErrors.accountNumber}</small>
              )} */}
              </p>
            </div>
          </div>
        </div>

        <div className="py-3 pl-3 mb-20 mt-4 rounded-lg" style={{ height: '90px' }}>
          <div className="flex ">
            <div className="mt-2 mr-12">
              <div className="">
                <span style={{ fontWeight: '400', fontSize: '14px' }}>
                  <div className="flex gap-1">
                    Note
                    <p className="text-red-600">*</p>
                  </div>
                </span>
              </div>
              <div className="mt-1">
                <InputComponent
                  // value={formData.note}
                  // onChange={(e) => handleInputChange('note', e.target.value)}
                  style={{
                    width: '600px',
                    height: '50px',
                    //   border: fieldErrors.note ? '1px solid red' : '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.70rem',
                    boxShadow: 'none',
                    padding: '10px',
                  }}
                />
                {/* <p>{fieldErrors.note && <small className="p-error">{fieldErrors.note}</small>}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`"flex gap-6  absolute left-6" ${isLoading ? 'blurred' : ''}`}
        style={{
          width: '100%',
          height: '80px',
          // border: "1px solid red",
          backgroundColor: 'white',
          padding: '0 12px',
          bottom: '0px',
        }}>
        <Button
          //  onClick={handleClick}
          label={'Save'}
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
            marginTop: '10px',
          }}
        />
        <Button
          //    onClick={closeModal}
          label={'Back'}
          text={true}
          style={{
            backgroundColor: 'white',
            color: '#000000',
            border: 'none',
            width: '89px',
            height: '42px',
            marginTop: '10px',
          }}
        />
      </div>
    </div>
  )
}

export default AddImage
