
import { useState } from "react";
import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "./AddCustomer";


const Customer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };


    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalClick = () => {
        console.log("Modal clicked");
        // Add any other functionality you want to perform on modal click
    };


    return (
        <div className="flex justify-around text-center mt-14">
        
            <div className="flex flex-col items-center">

                <div className='p-input-icon-left mt-14'>
                    {/* <ButtonComponent label={'ADD NEW'}
                        style={{ width: "7vw", backgroundColor: "black", cursor: "pointer", fontWeight: "bold" }} onClick={handleButtonClick}>
                        <img src="/assets/images/plus.png" alt="icon" className="p-icon  w-4 mr-4 " style={{ filter: 'invert(100%)', color: 'whitesmoke', fontWeight: "bolder", padding: "" }} />
                    </ButtonComponent> */}

                    <CustomModal onClick={handleModalOpen}
                        visible={isModalOpen}
                        onHide={handleModalClose}
                        style={{width:"50vw", height:"80vh", marginTop:"10rem"}}

                    >
                      <AddCustomer/>
                    </CustomModal>


                </div>






            </div>
        </div>

    );
};

export default Customer;


