import InputComponent from '../../CommonComponent/InputComponent'
import { useState, useEffect, useCallback } from 'react'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import CustomStateMap from '../../Map/CustomSelectPositionMap'
import { useAddBoatyardsMutation } from '../../../Services/MoorManage/MoormanageApi'
import { BoatYardProps } from '../../../Type/ComponentBasedType'
import useMetaData from '../../CommonComponent/MetaDataComponent'
import { Country, State } from '../../../Type/CommonType'
import { BoatYardResponse } from '../../../Type/ApiTypes'
import { InputText } from 'primereact/inputtext'

const AddBoatyards: React.FC<BoatYardProps> = ({ closeModal, boatYardData, gpsCoordinates }) => {
  const [boatyardId, setBoatyardId] = useState('')
  const [boatyardName, setBoatyardName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [aptSuite, setAptSuite] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState()
  const [zipCode, setZipCode] = useState('')
  const [mainContact, setMainContact] = useState('')
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()
  const [addBoatyard] = useAddBoatyardsMutation()
  const { getMetaData } = useMetaData()
  const [countriesData, setCountriesData] = useState<Country[]>()
  const [statesData, setStatesData] = useState<State[]>()

  const style = {
    width: '13vw',
    height: '4vh',
    border: '1px solid gray',
    borderRadius: '0.50rem',
    fontSize: '0.80vw',
  }

  const handlePositionChange = (lat: number, lng: number) => {
    setLatitude(lat)
    setLongitude(lng)
  }

  const handleSave = async () => {
    const selectedState = statesData?.find((stateItem) => stateItem.name === state)
    const selectedCountry = countriesData?.find((countryItem) => countryItem.name === country)

    const payload = {
      boatyardId: boatyardId,
      boatyardName: boatyardName,
      phone: phone,
      emailAddress: emailAddress,
      street: address,
      apt: aptSuite,
      zipCode: zipCode,
      contact: mainContact,
      state: selectedState,
      country: selectedCountry,
      gpsCoordinates: gpsCoordinates,
    }
    const response = await addBoatyard({ payload }).unwrap()
    const { status } = response as BoatYardResponse
    if (status === 200) {
      closeModal()
      boatYardData()
    }
  }

  const fetchDataAndUpdate = useCallback(async () => {
    const { countriesData, statesData } = await getMetaData()
    if (countriesData !== null) {
      setCountriesData(countriesData)
    }

    if (statesData !== null) {
      setStatesData(statesData)
    }
  }, [])

  useEffect(() => {
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  return (
    <>
      <div className="w-full h-full  ">


        <div className="flex gap-8 mt-3">
          <div>
            <span className="font-semibold text-sm">Boatyard ID</span>
            <div className="mt-2">
              <InputComponent
                value={boatyardId}
                onChange={(e) => setBoatyardId(e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border:'1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-semibold text-sm">Boatyard Name</span>
            <div className="mt-2">
              <InputComponent
                value={boatyardName}
                onChange={(e) => setBoatyardName(e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border:'1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-8 mt-4">
          <div>
            <div>
              <span className="font-semibold text-sm">Email Address</span>
            </div>

            <div className="mt-2">
              <InputComponent
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                style={{
                  width: '230px',
                  height: '32px',
                  border:'1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
          </div>

          <div>
            <div>
              <div>
                <span className="font-semibold text-sm">Phone</span>
              </div>
              <div className="mt-2">
                <InputComponent
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border:'1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    padding: '1.2em',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <span className="font-semibold text-sm">Address</span>
        </div>
        <div className="flex gap-8 mt-4">
          <div>
            <div className="mt-2">
              <InputComponent
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street/house"
                style={{
                  width: '230px',
                  height: '32px',
                  border:'1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
          </div>

          <div className="mt-2">
            <InputComponent placeholder="Apt/Suite"style={{
                  width: '230px',
                  height: '32px',
                  border:'1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }} />
          </div>

          <div className="mt-2">
            <Dropdown
              id="stateDropdown"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              options={statesData}
              optionLabel="name"
              style={{
                width: '230px',
                height: '32px',
                border:'1px solid #D5E1EA',
                borderRadius: '0.50rem',
                fontSize: '0.8rem',
                padding: '1.2em',
              }}
            />
          </div>
        </div>

        <div className="flex gap-6 mt-4">
          <div>
            <div className="mt-2">
              <Dropdown
                id="stateDropdown"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                options={countriesData}
                optionLabel="name"
                style={{
                  width: '230px',
                  height: '32px',
                  border:'1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                  padding: '1.2em',
                }}
              />
            </div>
          </div>

          <div>
            <div>
              <div className="mt-2">
                <InputComponent
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Zip code"
                  style={{
                    width: '230px',
                    height: '32px',
                    border:'1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    padding: '1.2em',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 mt-4">
          <div>
            <div>
              <span className="font-semibold text-sm">Main Contact</span>
            </div>

            <div>
              <div>
                <div className="mt-2">
                  <InputComponent
                    value={mainContact}
                    onChange={(e) => setMainContact(e.target.value)}
                    style={{
                      width: '230px',
                      height: '32px',
                      border:'1px solid #D5E1EA',
                      borderRadius: '0.50rem',
                      fontSize: '0.8rem',
                      padding: '1.2em',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <CustomStateMap onPositionChange={handlePositionChange} />
          </div>
        </div>

        <div className="flex gap-3 mt-12">
          <Button
            label={'Save'}
            onClick={handleSave}
            style={{
              width: '89px',
              height: '42px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontWeight: 'bolder',
              fontSize: '1rem',
              boxShadow: 'none',
              color: 'white',
              borderRadius: '0.50rem',
            }}
          />
          <Button
            label={'Back'}
            text={true}
            
          />
        </div>
      </div>

      {/* 
<div>
        <div className="flex gap-6 ">
          <div>
            <span className="font-medium text-sm text-[#000000]">Customer Name</span>
            <div className="mt-2">
              <InputComponent
      
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">Mooring ID</span>
            <div className="mt-2">
              <InputComponent
              
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">Harbor</span>
            <div className="mt-2">
              <InputComponent
               
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
          <div>
            <span className="font-medium text-sm text-[#000000]">Water Depth</span>
            <div className="mt-2">
              <InputComponent
            
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">G.P.S Coordinates</span>
            <div className="mt-2">
              <InputComponent
           
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">Boatyard Name</span>
            <div className="mt-2">
              <InputComponent
        
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
          <div>
            <span className="font-medium text-sm text-[#000000]">Boat Name</span>
            <div className="mt-2">
              <InputComponent
     
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-medium text-sm text-[#000000]">Boat Size</span>
            <div className="mt-2">
              <InputComponent
         
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">Type</span>
            </div>

            <div className="mt-2">
              <Dropdown
            
                optionLabel="name"
                editable
                placeholder="Skiff"
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
          <div>
            <span className="font-medium text-sm text-[#000000]">Weight</span>
            <div className="mt-2">
              <InputComponent
    
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">Size of Weight</span>
            </div>

            <div className="mt-2">
              <Dropdown
             
                optionLabel="name"
                editable
                placeholder="Select"
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">Type of Weight</span>
            </div>

            <div className="mt-2">
              <Dropdown
            
                optionLabel="name"
                editable
                placeholder="Select"
                style={{
                  width: '230px',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-3">
          <div>
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">Top Chain Condition</span>
              </div>

              <div className="mt-2">
                <Dropdown
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">Bootom Chain Condition</span>
              </div>

              <div className="mt-2">
                <Dropdown
                  value={undefined}
                
                  options={undefined}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">Pennant Condition</span>
              </div>

              <div className="mt-2">
                <Dropdown
                  value={undefined}
                  
                  options={undefined}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <span className="font-medium text-sm text-[#000000]">Condition of Eye</span>
              </div>
              <div className="mt-2">
                <Dropdown
                  value={undefined}
              
                  options={undefined}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">Shackle, Swivel Condition</span>
              </div>

              <div className="mt-2">
                <Dropdown
                  value={undefined}

                  options={undefined}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <span className="font-medium text-sm text-[#000000]">Dept at Mean High Water</span>
              </div>

              <div className="mt-2">
                <InputText
                  value={undefined}
                
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <span className="font-medium text-sm text-[#000000]">Pin on Map</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <Button
            onClick={undefined}
            label={'Save'}
            style={{
              width: '89px',
              height: '42px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontWeight: 'bolder',
              fontSize: '1rem',
              boxShadow: 'none',
              color: 'white',
              borderRadius: '0.50rem',
            }}
          />
          <Button
            onClick={function (): void {
              throw new Error('Function not implemented.')
            }}
            label={'Back'}
            text={true}
            style={{
              backgroundColor: 'white',
              color: '#000000',
              border: 'none',
              width: '89px',
              height: '42px',
            }}
          />
        </div>
      </div> */}





    </>
  )
}

export default AddBoatyards
