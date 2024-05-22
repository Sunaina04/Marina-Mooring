import { InputText } from 'primereact/inputtext'
import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { inputHeader } from '../../../Type/ComponentBasedType'

const InputTextWithHeader: React.FC<inputHeader> = ({
  header,
  iconStyle,
  onChange,
  placeholder,
  headerStyle,
  inputTextStyle,
  value,
}) => {
  return (
    <>
      <div className="text-sm font-extrabold rounded-sm w-full ">
        <h1 style={headerStyle} className="p-4">
          {header}
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-center mt-[-15px] bg-[white]">
          <div className="p-input-icon-left ">
            <img
              src="/assets/images/Search.svg"
              alt="Search Icon"
              className="p-clickable"
              style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '18px',
                height: '18px',
              }}
            />
            <InputText
              placeholder={placeholder}
              style={inputTextStyle}
              onChange={onChange}
              value={value}
            />
          </div>
        </div>
        <span className="border-[1px] border-[#D5E1EA] w-1/10 mt-3 mr-4 ml-4"></span>
      </div>
    </>
  )
}

export default InputTextWithHeader
