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
      <div className="text-sm font-extrabold rounded-sm w-full  bg-[#10293A]">
        <h1 style={headerStyle} className="p-4">
          {header}
        </h1>
      </div>
      <div className="flex items-center justify-center mt-2 bg-[white]">
        <div className="p-input-icon-left ">
          <IoSearch style={iconStyle} />
          <InputText
            placeholder={placeholder}
            style={inputTextStyle}
            onChange={onChange}
            value={value}
          />
        </div>
      </div>
    </>
  )
}

export default InputTextWithHeader
