import React from 'react'
import InputComponent from '../../Common/InputComponent'

const AddCustomer = () => {
    return (
        <>
            <div className="w-full h-full border-2 p-4 rounded-lg ">
                <div>
                    <h1>Add Customer</h1>

                </div>

                <div className='flex justify-around mt-8'>
                    <div>
                        <span>Mooring Name</span>
                        <InputComponent placeholder={''} type='text' />
                    </div>

                    <div>
                        <span>Customer ID</span>
                        <InputComponent placeholder={''} type='text'/>
                    </div>

                    <div>
                        <span>Owner Name</span>
                        <InputComponent placeholder={''} type='text'/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddCustomer
