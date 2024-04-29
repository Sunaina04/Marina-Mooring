import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FormFieldsProps } from '../../Type/CommonType';

const FormFields: React.FC<FormFieldsProps> = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === 'file' ? (
        <input
          type="file"
          id={label}
          name={label}
          onChange={onChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      ) : (
        <InputText
          type={type}
          id={label}
          name={label}
          value={value}
          onChange={onChange}
          style={{
            width: '13vw',
            height: '4vh',
            border: '1px solid gray',
            borderRadius: '0.50rem',
          }}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      )}
    </div>
  );
};

export default FormFields;
