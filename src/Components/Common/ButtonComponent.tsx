import { Button } from 'primereact/button';
import React from 'react';

interface ButtonCompProps {
  onClick: () => void;
  disabled?: boolean;
  label:string,
  
  
}

const ButtonComponent: React.FC<ButtonCompProps> = ({ onClick, disabled , label}) => {
  return (
    <Button onClick={onClick}  disabled={disabled} label={label}/>
  );
}

export default ButtonComponent;
