import React, { useEffect, useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import InputComponent from '../../CommonComponent/InputComponent'
import { useAddMooringsMutation } from '../../../Services/MoorManage/MoormanageApi'
import { Button } from 'primereact/button'
import { CityProps } from '../../../Type/CommonType'
import { AddMooringProps } from '../../../Type/ComponentBasedType'

const AddMoorings: React.FC<AddMooringProps> = ({ moorings, editMode }) => {
  const [value, setValue] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<CityProps | undefined>(undefined)
  const [saveMoorings] = useAddMooringsMutation()
  const [formData, setFormData] = useState<any>({
    customerName: '',
    mooringNumber: '',
    harbor: '',
    waterDepth: '',
    gpsCoordinates: '',
    boatName: '',
    boatSize: '',
    boatWeight: '',
    sizeOfWeight: '',
    typeOfWeight: '',
    topChainCondition: '',
    conditionOfEye: '',
    bottomChainCondition: '',
    shackleSwivelCondition: '',
    pennantCondition: '',
    deptAtMeanHighWater: '',
    note: '',
  })

  useEffect(() => {
    if (editMode && moorings) {
      setFormData({
        customerName: moorings.customerName || '',
        mooringNumber: moorings.mooringNumber || '',
        harbor: moorings.harbor || '',
        waterDepth: moorings.waterDepth || '',
        gpsCoordinates: moorings.gpsCoordinates || '',
        boatName: moorings.boatName || '',
        boatSize: moorings.boatSize || '',
        boatWeight: moorings.boatWeight || '',
        sizeOfWeight: moorings.sizeOfWeight || '',
        typeOfWeight: moorings.typeOfWeight || '',
        topChainCondition: moorings.topChainCondition || '',
        conditionOfEye: moorings.conditionOfEye || '',
        bottomChainCondition: moorings.bottomChainCondition || '',
        shackleSwivelCondition: moorings.shackleSwivelCondition || '',
        pennantCondition: moorings.pennantCondition || '',
        deptAtMeanHighWater: moorings.deptAtMeanHighWater || '',
      })
    }
  }, [editMode, moorings])

  const cities: CityProps[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const SaveMoorings = async () => {
    const payload = {
      ...formData,
    }
    const response = await saveMoorings(payload)
  }

  return (
    <>
      <div>
        <div className="flex gap-6 ">
          <div>
            <span className="font-medium text-sm text-[#000000]">Customer Name</span>
            <div className="mt-2">
              <InputComponent
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
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
                value={formData.mooringNumber}
                onChange={(e) => handleInputChange('mooringNumber', e.target.value)}
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
                value={formData.harbor}
                onChange={(e) => handleInputChange('harbor', e.target.value)}
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
                value={formData.waterDepth}
                onChange={(e) => handleInputChange('waterDepth', e.target.value)}
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
                value={formData.gpsCoordinates}
                onChange={(e) => handleInputChange('gpsCoordinates', e.target.value)}
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
                value={formData.boatName}
                onChange={(e) => handleInputChange('boatName', e.target.value)}
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
                // placeholder="Enter owner name"
                // type="text"
                value={formData.boatName}
                onChange={(e) => handleInputChange('boatName', e.target.value)}
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
                value={formData.boatSize}
                onChange={(e) => handleInputChange('boatSize', e.target.value)}
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
                value={formData.typeOfWeight}
                onChange={(e) => handleInputChange('typeOfWeight', e.value)}
                options={cities}
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
                value={formData.boatWeight}
                onChange={(e) => handleInputChange('boatWeight', e.target.value)}
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
                value={formData.sizeOfWeight}
                onChange={(e) => handleInputChange('sizeOfWeight', e.value)}
                options={cities}
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
                value={formData.typeOfWeight}
                onChange={(e) => handleInputChange('typeOfWeight', e.value)}
                options={cities}
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
                  value={formData.topChainCondition}
                  onChange={(e) => handleInputChange('topChainCondition', e.value)}
                  options={cities}
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
                  value={formData.conditionOfEye}
                  onChange={(e) => handleInputChange('conditionOfEye', e.value)}
                  options={cities}
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
                  value={selectedCity}
                  onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                  options={cities}
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
                  value={formData.conditionOfEye}
                  onChange={(e) => handleInputChange('conditionOfEye', e.value)}
                  options={cities}
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
                <span className="font-medium text-sm text-[#000000]">Shackle,Swivel Condition</span>
              </div>

              <div className="mt-2">
                <Dropdown
                  value={selectedCity}
                  onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                  options={cities}
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
                  value={formData.deptAtMeanHighWater}
                  onChange={(e) => handleInputChange('deptAtMeanHighWater', e.target.value)}
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

        <div className="flex gap-6 mt-10">
          <Button
            onClick={SaveMoorings}
            label={'Save'}
            style={{
              width: '5rem',
              height: '7vh',
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
            style={{ backgroundColor: 'white', color: 'black', border: 'none' }}
          />
        </div>
      </div>
    </>
  )
}

export default AddMoorings
