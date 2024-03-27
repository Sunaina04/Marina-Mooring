
import { useState } from "react";
import { Button } from "@mui/material";
import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";

const Customer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-around text-center">
      <div>
        <h1 className="text-[2.30rem] text-[gray]">Moormanage/Customer</h1>
      </div>

      <div className="flex flex-col items-center">
       
        <div className='p-input-icon-left'>
          <ButtonComponent label={'ADD NEW'}
           style={{ width: "7vw", backgroundColor:"black",cursor:"pointer" , fontWeight:"bold"}} onClick={handleButtonClick}>
            <img  src="/assets/images/plus.png" alt="icon" className="p-icon  w-4 mr-4 " style={{ filter: 'invert(100%)', color: 'whitesmoke', fontWeight:"bolder", padding:""}} />
          </ButtonComponent>
        </div>


        <CustomModal open={isModalOpen} setOpen={setIsModalOpen}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur enim totam in maiores quaerat velit placeat culpa! Iure saepe optio, minima nam debitis facilis modi cupiditate, praesentium, velit ipsa eum.</p>
        </CustomModal>
      </div>
    </div>

  );
};

export default Customer;


