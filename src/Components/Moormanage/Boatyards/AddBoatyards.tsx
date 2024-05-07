import InputComponent from '../../CommonComponent/InputComponent'
import ButtonComponent from '../../CommonComponent/ButtonComponent'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useState, useEffect, useCallback } from 'react'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useAddBoatyardsMutation } from '../../../Services/MoorManage/MoormanageApi'
import { BoatYardProps } from '../../../Type/ComponentBasedType'
import useMetaData from '../../CommonComponent/MetaDataComponent'
import { Country, State } from '../../../Type/CommonType'

const AddBoatyards: React.FC<BoatYardProps> = ({
  closeModal,
  boatYardData,
}) => {
  const [boatyardId, setBoatyardId] = useState('')
  const [boatyardName, setBoatyardName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [aptSuite, setAptSuite] = useState('')
  const [state, setState] = useState()
  const [country, setCountry] = useState()
  const [zipCode, setZipCode] = useState('')
  const [mainContact, setMainContact] = useState('')
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

  const handleSave = async () => {
    const yardPayload = {
      boatyardId: boatyardId,
      boatyardName: boatyardName,
      phone: phone,
      emailAddress: emailAddress,
      street: address,
      apt: aptSuite,
      zipCode: zipCode,
      contact: mainContact,
      state: state,
      country: country
    }
    const response = await addBoatyard(yardPayload)
    closeModal()
    boatYardData()
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
        <h1 className=" text-lg font-bold">Add Boatyard</h1>

        <div className="flex gap-8 mt-3">
          <div>
            <span className="font-semibold text-sm">Boatyard ID</span>
            <div className="mt-2">
              <InputComponent
                value={boatyardId}
                onChange={(e) => setBoatyardId(e.target.value)}
                style={{
                  width: '14vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  // color:"black"
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
                  width: '14vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  // color:"black"
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
                  width: '14vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  // color:"black"
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
                    width: '14vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                    // color:"black"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <span className="font-semibold text-sm">Address</span>
        </div>
        <div className="flex gap-6">
          <div className="mt-2">
            <InputComponent
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street/house"
              style={{
                width: '14vw',
                height: '4vh',
                border: '1px solid gray',
                borderRadius: '0.50rem',
                // color:"black"
              }}
            />
          </div>

          <div className="mt-2">
            <InputComponent
              placeholder="Apt/Suite"
              style={{
                width: '14vw',
                height: '4vh',
                border: '1px solid gray',
                borderRadius: '0.50rem',
                // color:"black"
              }}
            />
          </div>

          <div className="mt-2">
            <Dropdown
              id="stateDropdown"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              options={statesData}
              style={{
                width: '14vw',
                height: '4vh',
                border: '1px solid gray',
                borderRadius: '0.50rem',
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
                style={{
                  width: '14vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  // marginBottom:"1rem"
                  // color:"black"
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
                    width: '14vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                    // color:"black"
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
                      width: '14vw',
                      height: '4vh',
                      border: '1px solid gray',
                      borderRadius: '0.50rem',
                      // color:"black"
                    }}
                  />
                </div>
              </div>
            </div>

            <div>{/* Add Map Here */}</div>
          </div>
        </div>

        <div className="flex gap-3 mt-12">
          <Button
            label={'Save'}
            onClick={handleSave}
            style={{
              width: '5vw',
              backgroundColor: 'black',
              cursor: 'pointer',
              fontWeight: 'bolder',
              fontSize: '1vw',
              border: '1px solid  gray',
              color: 'white',
              borderRadius: '0.50rem',
            }}
          />
          <Button
            label={'Back'}
            text={true}
            style={{ backgroundColor: 'white', color: 'black', border: 'none' }}
          />
        </div>
      </div>
    </>
  )
}

export default AddBoatyards
