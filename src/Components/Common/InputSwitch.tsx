import React, { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";

const InputSwitchComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e : any) => {
    setIsChecked(e.value);
  };

  return (
    <div>
      <InputSwitch
        checked={isChecked}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputSwitchComponent;
