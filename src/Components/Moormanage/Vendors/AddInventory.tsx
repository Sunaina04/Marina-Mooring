import { Dropdown } from 'primereact/dropdown'
import React, { useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'

function AddInventory() {
  const [checked, setChecked] = useState<boolean>(false)
  const [unChecked, setUnChecked] = useState<boolean>(false)
 

  return (
    <>
      <div className="ml-4">
        <div>
          <Dropdown
            style={{
              width: '230px',
              height: '32px',
              border: '1px solid #D5E1EA',
              borderRadius: '0.50rem',
              fontSize: '12px',
            }}
          />
        </div>
        <div className="flex gap-5 mt-5">
          <div>
            <div className="font-medium text-sm text-[#000000]">
              <p>Item Name/Number</p>
            </div>
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
            <div className="font-medium text-sm text-[#000000]">
              <p>Cost</p>
            </div>
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
        <div className="flex gap-5 mt-5">
          <div>
            <div className="font-medium text-sm text-[#000000]">
              <p>Sale Price</p>
            </div>
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
            <div className="font-medium text-sm text-[#000000]">
              <p>Taxable</p>
            </div>
            <div className="flex mt-3 gap-5">
              <div className="flex gap-2">
                <div>
                  <Checkbox
                    onChange={(e) => setChecked(e.checked ?? false)}
                    checked={checked}
                    style={{ border: '1px solid #D5E1EA', height:'22px', width:'22px', borderRadius:'5px' }}
                  />
                </div>
                <div className="font-medium text-sm text-[#000000]">
                  <p>Yes</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div>
                  <Checkbox
                    onChange={(e) => setUnChecked(e.checked ?? false)}
                    checked={unChecked}
                    style={{ border: '1px solid #D5E1EA', height:'22px', width:'22px', borderRadius:'5px' }}></Checkbox>
                </div>
                <div className="font-medium text-sm text-[#000000]">
                  <p>No</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Button
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
            label={'Back'}
            style={{
              backgroundColor: 'white',
              color: '#000000',
              border: 'none',
              width: '89px',
              height: '42px',
            }}
          />
        </div>
      </div>
    </>
  )
}

export default AddInventory
