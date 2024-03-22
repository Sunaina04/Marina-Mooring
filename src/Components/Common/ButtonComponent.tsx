import { Button } from 'primereact/button';
import React from 'react';

interface ButtonCompProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  style?: React.CSSProperties; // Add style prop for custom styles
}

const ButtonComponent: React.FC<ButtonCompProps> = ({ onClick, disabled, label, style }) => {
  return (
    <Button onClick={onClick} disabled={disabled} label={label} style={style} />
  );
}

export default ButtonComponent;
