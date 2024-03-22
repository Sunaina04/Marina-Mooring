
import { InputText } from "primereact/inputtext";
import React from 'react';
interface InputCompProps {
    placeholder: string;
    type: "text" | "password" | "number" | "email" | "date";
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;

    autoFocus?: boolean;
}

const InputComponent: React.FC<InputCompProps> = ({ placeholder, type, value, onChange, disabled, required, autoFocus }) => {
    return (
        <InputText
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
        />


    );
}

export default InputComponent;
