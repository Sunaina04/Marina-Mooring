import InputComponent from '../../CommonComponent/InputComponent'
import ButtonComponent from '../../CommonComponent/ButtonComponent'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useState } from 'react'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import CustomMap from '../../Map/CustomDisplayPositionMap'
import { MarkerData } from '../../../Type/CommonType'
import CustomStateMap from '../../Map/CustomSelectPositionMap'

const AddBoatyards = () => {
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
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  const handlePositionChange = (lat : number, lng :number) => {
    setLatitude(lat);
    setLongitude(lng);
};

console.log("VALUES" , latitude , longitude)

const style = {
    width: '13vw',
    height: '4vh',
    border: '1px solid gray',
    borderRadius: '0.50rem',
    fontSize: '0.80vw',
  }

  const handleSave = () => {
    return void 0
  }

  const markers: MarkerData[] = [
    { position: [51.505, -0.09], popupContent: 'Marker 1' },
    { position: [51.51, -0.1], popupContent: 'Marker 2' },
  ]

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
                style={style}
              />
            </div>
          </div>

          <div>
            <span className="font-semibold text-sm">Boatyard Name</span>
            <div className="mt-2">
              <InputComponent
                value={boatyardName}
                onChange={(e) => setBoatyardName(e.target.value)}
                style={style}
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
                style={style}
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
                  style={style}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 mt-4">
          <div>
            <div>
              <span className="font-semibold text-sm">Address</span>
            </div>

            <div className="mt-2">
              <InputComponent
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street/house"
                style={style}
              />
            </div>
          </div>

          <div>
            <div>
              <div className="mt-2">
                <InputComponent placeholder="Apt/Suite" style={style} />
              </div>
            </div>
          </div>

          <div>
            <div>
              <div className="mt-2">
                <Dropdown
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  style={style}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 mt-4">
          <div>
            <div className="mt-2">
              <Dropdown
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                style={style}
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
                  style={style}
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
                    style={style}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='ml-12 mr-12 mt-10'>
          <CustomStateMap onPositionChange={handlePositionChange}/>
        </div>

        <div className="flex gap-3 mt-4 ml-6">
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
