import { Button } from "primereact/button";
import React, { ReactNode } from "react";

interface ButtonCompProps {
  // onClick: () => void;
  disabled?: boolean;
  label: string;
  style?: React.CSSProperties;
  size?: "small" | "large";
  icon?: JSX.Element;
  color?: string;
  children?: ReactNode;
  text?: boolean;
}

const ButtonComponent: React.FC<ButtonCompProps> = ({
  // onClick,
  disabled,
  label,
  style,
  size,
  icon,
  color,
  children,
}) => {
  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <Button
        disabled={disabled}
        label={label}
        style={style}
        size={size}
        icon={icon}
        color={color}
        children={children}
      />
    </div>
  );
};

export default ButtonComponent;
