import { Dropdown } from 'primereact/dropdown'
import React, { useCallback, useEffect, useState } from 'react'
import InputComponent from '../../CommonComponent/InputComponent'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { TypeOfInventoryType } from '../../CommonComponent/MetaDataComponent/MetaDataApi'
import { MetaData } from '../../../Type/CommonType'
import {
  useAddInventoryMutation,
  useUpdateInventoryMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { AddInventoryProps, CustomerDataProps } from '../../../Type/ComponentBasedType'
import { CustomerResponse, ErrorResponse, VendorResponse } from '../../../Type/ApiTypes'

const AddInventory: React.FC<AddInventoryProps> = ({
  id,
  toastRef,
  closeModal,
  editMode,
  selectedInventory,
  getInventoryHandler,
}) => {
  const { getTypeOfInventoryTypeData } = TypeOfInventoryType()
  const [checked, setChecked] = useState<boolean>(false)
  const [unChecked, setUnChecked] = useState<boolean>(false)
  const [inventoryType, setInventoryType] = useState<MetaData[]>([])
  const [formData, setFormData] = useState<any>({
    itemName: '',
    cost: '',
    salePrice: '',
    itemsName: '',
    type: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [addInventory] = useAddInventoryMutation()
  const [UpdateInventory] = useUpdateInventoryMutation()

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
    setErrors({
      ...errors,
      [field]: '',
    })
  }

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.type) newErrors.type = 'Type is required'
    if (!formData.itemName) newErrors.itemName = 'Item Name/Number is required'
    if (!formData.cost) newErrors.cost = 'Cost is required'
    if (!formData.salePrice) newErrors.salePrice = 'Sale Price is required'
    if (!checked && !unChecked) newErrors.taxable = 'Please select Taxable Yes or No'

    setErrors(newErrors)
    return newErrors
  }

  const handleEditMode = () => {
    setFormData((prevState: any) => ({
      ...prevState,
      itemName: selectedInventory?.itemName || '',
      type: selectedInventory?.inventoryType?.type || '',
      cost: selectedInventory?.cost || '',
      salePrice: selectedInventory?.salePrice,
    }))
    if (selectedInventory?.taxable === true) {
      setChecked(true)
    } else {
      setUnChecked(true)
    }
  }

  const handleSave = async () => {
    const validationErrors = validateFields()
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    try {
      const savePayload = {
        inventoryTypeId: formData?.type?.id,
        cost: formData?.cost,
        salePrice: formData?.salePrice,
        itemName: formData?.itemName,
        taxable: checked,
      }
      const response = await addInventory({ vendorId: id, payload: savePayload }).unwrap()
      const { status, message } = response as VendorResponse
      if (status === 200 || status === 201) {
        getInventoryHandler()
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Inventory Saved successfully',
          life: 3000,
        })
        closeModal()
      } else {
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      const { message, data } = error as ErrorResponse
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: data.message,
        life: 3000,
      })
    }
  }

  const handleUpdate = async () => {
    const errors = validateFields()
    if (Object.keys(errors).length > 0) {
      return
    }

    if (selectedInventory?.taxable === true) {
      setChecked(true)
    } else {
      setUnChecked(true)
    }

    try {
      const editPayload = {
        inventoryTypeId: formData?.type?.id,
        cost: formData?.cost,
        salePrice: formData?.salePrice,
        itemName: formData?.itemName,
        taxable: checked,
      }
      const response = await UpdateInventory({
        vendorId: id,
        payload: editPayload,
        id: selectedInventory?.id,
      }).unwrap()
      const { status, message } = response as CustomerResponse
      if (status === 200 || status === 201) {
        getInventoryHandler()
        closeModal()
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: message,
          life: 3000,
        })
      } else {
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      const { message } = error as ErrorResponse
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000,
      })
    }
  }

  const fetchDataInventoryType = useCallback(async () => {
    const { typeOfBoatTypeData } = await getTypeOfInventoryTypeData()
    if (typeOfBoatTypeData !== null) {
      setInventoryType(typeOfBoatTypeData)
    }
  }, [])

  useEffect(() => {
    if (editMode) {
      handleEditMode()
    }
  }, [editMode])

  useEffect(() => {
    fetchDataInventoryType()
  }, [fetchDataInventoryType])

  return (
    <>
      <div className="ml-4">
        <div>
          <Dropdown
            value={formData.type}
            options={inventoryType}
            onChange={(e) => handleInputChange('type', e.target.value)}
            optionLabel="type"
            editable
            placeholder="Select Type"
            style={{
              width: '230px',
              height: '32px',
              border: errors.type ? '1px solid red' : '1px solid #D5E1EA',
              borderRadius: '0.50rem',
              color: 'black',
              fontSize: '0.8rem',
            }}
          />
          <p className="">{errors.type && <small className="p-error">{errors.type}</small>}</p>
        </div>
        <div className="flex gap-5 mt-5">
          <div>
            <div className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Item Name/Number
                <p className="text-red-600">*</p>
              </div>
            </div>
            <div className="mt-2">
              <InputComponent
                style={{
                  width: '230px',
                  height: '32px',
                  border: errors.itemName ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
                onChange={(e) => handleInputChange('itemName', e.target.value)}
                value={formData.itemName}
              />

              <p className="">
                {errors.itemName && <small className="p-error">{errors.itemName}</small>}
              </p>
            </div>
          </div>
          <div>
            <div className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Cost
                <p className="text-red-600">*</p>
              </div>
            </div>
            <div className="mt-2">
              <InputComponent
                style={{
                  width: '230px',
                  height: '32px',
                  border: errors.cost ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
                onChange={(e) => handleInputChange('cost', e.target.value)}
                value={formData.cost}
              />
              <p className="">{errors.cost && <small className="p-error">{errors.cost}</small>}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-5">
          <div>
            <div className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Sale Price
                <p className="text-red-600">*</p>
              </div>
            </div>
            <div className="mt-2">
              <InputComponent
                style={{
                  width: '230px',
                  height: '32px',
                  border: errors.salePrice ? '1px solid red' : '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                  fontSize: '0.8rem',
                }}
                onChange={(e) => handleInputChange('salePrice', e.target.value)}
                value={formData.salePrice}
              />
              <p className="">
                {errors.salePrice && <small className="p-error">{errors.salePrice}</small>}
              </p>
            </div>
          </div>

          <div>
            <div className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Taxable
                <p className="text-red-600">*</p>
              </div>
            </div>
            <div className="flex mt-3 gap-5">
              <div className="flex gap-2">
                <div>
                  <Checkbox
                    onChange={(e) => {
                      setChecked(e.checked ?? false)
                      setUnChecked(!e.checked)
                      setErrors((prevErrors) => ({ ...prevErrors, taxable: '' }))
                    }}
                    checked={checked}
                    style={{
                      border: '1px solid #D5E1EA',
                      height: '22px',
                      width: '22px',
                      borderRadius: '5px',
                    }}
                  />
                </div>
                <div className="font-medium text-sm text-[#000000]">
                  <p>Yes</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div>
                  <Checkbox
                    onChange={(e) => {
                      setUnChecked(e.checked ?? false)
                      setChecked(!e.checked)
                      setErrors((prevErrors) => ({ ...prevErrors, taxable: '' }))
                    }}
                    checked={unChecked}
                    style={{
                      border: '1px solid #D5E1EA',
                      height: '22px',
                      width: '22px',
                      borderRadius: '5px',
                    }}></Checkbox>
                </div>
                <div className="font-medium text-sm text-[#000000]">
                  <p>No</p>
                </div>
              </div>

              {errors.taxable && <small className="p-error">{errors.taxable}</small>}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Button
            label={'Save'}
            onClick={() => {
              if (editMode) {
                handleUpdate()
              } else {
                handleSave()
              }
            }}
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
