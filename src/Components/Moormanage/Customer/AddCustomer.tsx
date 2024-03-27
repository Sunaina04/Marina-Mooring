
import InputComponent from "../../Common/InputComponent";
import DatePickerComponent from "../../Common/DatePickerComponent";
import TextAreaComponent from "../../Common/TextAreaComponent";
import ButtonComponent from "../../Common/ButtonComponent";

const AddCustomer = () => {
    return (
        <div className="w-full h-full ">
            <h1 className="ml-6 text-lg font-bold">Add Customer</h1>

            <div className="flex justify-around mt-8">
                <div>
                    <span>Mooring Name</span>
                    <InputComponent placeholder="Enter mooring name" type="text" 
                    style={{width:"13vw", height:"5vh",border:"1px solid gray",borderRadius:"0.50rem" }}/>
                </div>

                <div>
                    <span>Customer ID</span>
                    <InputComponent placeholder="Enter customer ID" type="text" 
                    style={{width:"13vw", height:"5vh",border:"1px solid gray",borderRadius:"0.50rem" }}/>
                    
                    
                </div>

                <div>
                    <span>Owner Name</span>
                    <InputComponent placeholder="Enter owner name" type="text" 
                    
                    style={{width:"13vw", height:"5vh",border:"1px solid gray",borderRadius:"0.50rem" }}/>
                    
                    
                </div>
            </div>

            <div className="mt-11 ml-7 ">

                <div>
                    <h1>Select Date</h1>
                </div>

                <div className="flex  ">
                    <div className="">
                        <DatePickerComponent
                            onChange={(newValue: Date) => {
                                console.log(newValue);
                            }}
                        />
                    </div>

                    <div>

                        <DatePickerComponent
                            onChange={(newValue: Date) => {
                                console.log(newValue);
                            }}
                        />
                    </div>

                </div>

            </div>

            <div>
                <div>

                    <h1>About Mooring</h1>
                </div>

                <div className="flex justify-around">
                    <div>
                        <span>Boat Type</span>
                        <InputComponent placeholder="" type="text" />
                    </div>

                    <div>
                        <span>Boat Length(m)</span>
                        <InputComponent placeholder="" type="text" />
                    </div>

                    <div>
                        <span>Boat Width(m)</span>
                        <InputComponent placeholder="" type="text" />
                    </div>

                    <div>
                        <span>Draft(m)</span>
                        <InputComponent placeholder="" type="text" />
                    </div>

                    <div>
                        <span>Boat Weight(Kg)</span>
                        <InputComponent placeholder="" type="text" />
                    </div>

                </div>

            </div>


            <div>
                <span>Address</span>
                <TextAreaComponent onChange={function (value: string): void {
                    throw new Error("Function not implemented.");
                }} />

            </div>

            <div className="flex gap-3">

                <ButtonComponent onClick={function (): void {
                    throw new Error("Function not implemented.");
                } } label={"Save"}
                
                style={{backgroundColor:"black", cursor:"pointer",border:"1px solid  gray"}}
                />
                <ButtonComponent onClick={function (): void {
                    throw new Error("Function not implemented.");
                } } label={"Back"} 
                style={{backgroundColor:"white", color:"black"}}
                />
            </div>



        </div>
    );
};

export default AddCustomer;
