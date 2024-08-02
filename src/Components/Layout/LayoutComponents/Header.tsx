import React, { useCallback, useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Dropdown } from 'primereact/dropdown'
import { HeaderProps } from '../../../Type/ComponentBasedType'
import { useDispatch, useSelector } from 'react-redux'
import { CustomerPayload, ErrorResponse, GetUserResponse } from '../../../Type/ApiTypes'
import { setCustomerId, setCustomerName, selectCustomerName } from '../../../Store/Slice/userSlice'
import { useGetCustomersOwnersMutation } from '../../../Services/MetaDataApi'
import HeaderProfile from './HeaderProfile'

const Header: React.FC<HeaderProps> = ({ header, customer }) => {
  const userData = useSelector((state: any) => state.user?.userData)
  const role = userData?.role?.id
  const dispatch = useDispatch()
  const selectedCustomerName = useSelector(selectCustomerName)
  const [expanded, setExpanded] = useState(false)
  const [getCustomerOwnerData, setgetCustomerOwnerData] = useState<any[]>([])
  const [getUser] = useGetCustomersOwnersMutation()
 
  const [tooltipVisible, setTooltipVisible] = useState(false)


  const handleMenu = () => {
    setExpanded(!expanded)
    setTooltipVisible(!tooltipVisible)
  }

  const handleCustomerIdSelection = (customerId: any) => {
    const firstLastName = customerId?.firstName + ' ' + customerId?.lastName
    dispatch(setCustomerName(firstLastName))
    dispatch(setCustomerId(customerId?.id))
  }
  

  const getUserHandler = useCallback(async () => {
    try {
      const response = await getUser({}).unwrap()
      const { status, message, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content)) {
        if (content.length > 0) {
          const firstLastName = content.map((item) => ({
            label: item.firstName + ' ' + item.lastName,
            value: item,
          }))
          setgetCustomerOwnerData(firstLastName)
        } else {
          setgetCustomerOwnerData([])
        }
      }
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error occurred while fetching customer data:', message)
    }
  }, [getUser, role === 1, customer])

  useEffect(() => {
    if (role === 1) {
      getUserHandler()
    }
  }, [role === 1, customer])

  return (
    <div
      style={{
        background: '#FFFFFF',
        padding: '15px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        marginLeft: '3rem',
        marginRight: '2rem',
        borderRadius: '0.5rem',
        fontSize: '18px',
        fontWeight: 500,
        textAlign: 'left',
        color: '#AEAEAE',
      }}>
      {header}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minWidth: '300px',
          justifyContent: 'end',
        }}>
        {role === 1 && (
          <Dropdown
            value={selectedCustomerName}
            onChange={(e) => {
              handleCustomerIdSelection(e.value)
            }}
            optionLabel="label"
            optionValue="value"
            placeholder="Select"
            options={getCustomerOwnerData}
            editable
            style={{
              width: '160px',
              height: '32px',
              minHeight: '32px',
              border: '1px solid gray',
              borderRadius: '0.5rem',
              color: 'black',
              marginRight: '40px',
            }}
          />
        )}
        {userData && (
          <>
            <Avatar image={'/assets/images/user.png'} />
            <span style={{ color: '#000000', fontSize: '16px', fontWeight: 400 }}>
              {userData.name}
            </span>{' '}
          </>
        )}
    
        <HeaderProfile customer={userData} />
      </div>

      
    </div>
  )
}

export default Header
