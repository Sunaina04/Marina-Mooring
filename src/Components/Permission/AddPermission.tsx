import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import InputComponent from '../CommonComponent/InputComponent'
import { Button } from 'primereact/button'
import { CityProps } from '../../Type/CommonType'

const AddPermission = () => {
  const [value, setValue] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<CityProps | undefined>(undefined)
  const cities: CityProps[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ]

  return (
    <>
      <div className="w-full h-full  ">
        <div className="flex justify-around mt-3">
          <div>
            <span className="font-semibold text-sm">Name</span>
            <div className="mt-2">
              <InputComponent
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-semibold text-sm">ID</span>
            <div className="mt-2">
              <InputComponent
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-semibold text-sm">Phone</span>
            <div className="mt-2">
              <InputComponent
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 ">
          <div>
            <div className="ml-4 ">
              <div className="mt-3">
                <span className="font-semibold text-sm ">Email Address</span>
              </div>

              <div className="mt-3">
                <InputText
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                    fontSize: '0.80vw',
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="">
              <div className="mt-3">
                <span className="font-semibold text-sm">Role</span>
              </div>

              <div className="mt-3">
                <Dropdown
                  value={selectedCity}
                  onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Select"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="mt-8 ml-5">
            <h1 className="text-lg font-bold">Address</h1>
          </div>

          <div className="flex justify-around  mt-4 ml-2 ">
            <div>
              <div className="mt-2">
                <InputText
                  placeholder="Street/house"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <InputText
                  placeholder="Apt/Suite"
                  type="text"
                  style={{
                    width: '13vw',
                    height: '4vh',
                    border: '1px solid gray',
                    borderRadius: '0.50rem',
                  }}
                />
              </div>
            </div>

            <div className="card flex justify-content-center mt-2 ">
              <Dropdown
                value={selectedCity}
                onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                editable
                placeholder="State"
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                }}
              />
            </div>
          </div>

          <div className="flex mt-5 gap-6 ml-5">
            <div className="card flex justify-content-center">
              <Dropdown
                value={selectedCity}
                onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                editable
                placeholder="Country"
                className=""
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                }}
              />
            </div>
            <InputText
              placeholder="Zipcode"
              style={{
                width: '13vw',
                height: '4vh',
                border: '1px solid gray',
                borderRadius: '0.50rem',
              }}
            />
          </div>
        </div>
        <div className="flex ml-5 mt-5 gap-6 text-black">
          <div>
            <span className="font-semibold text-sm">Create password</span>
            <div className="mt-2">
              <InputComponent
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>
          <div>
            <span className="font-semibold text-sm">Confirm password</span>
            <div className="mt-2">
              <InputComponent
                style={{
                  width: '13vw',
                  height: '4vh',
                  border: '1px solid gray',
                  borderRadius: '0.50rem',
                  fontSize: '0.80vw',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-10 ml-6">
          <Button
            label={'Save'}
            style={{
              width: '5vw',
              height: '7vh',
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

export default AddPermission
