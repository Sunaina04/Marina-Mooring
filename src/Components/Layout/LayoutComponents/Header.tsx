import React, { useCallback, useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Dropdown } from 'primereact/dropdown'
import { HeaderProps } from '../../../Type/ComponentBasedType'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorResponse, GetUserResponse } from '../../../Type/ApiTypes'
import { setCustomerId, setCustomerName, selectCustomerName } from '../../../Store/Slice/userSlice'
import { useGetCustomersOwnersMutation } from '../../../Services/MetaDataApi'
import HeaderProfile from './HeaderProfile'
import { useQuickBookMutation } from '../../../Services/AdminTools/AdminToolsApi'

const Header: React.FC<HeaderProps> = ({ header, customer }) => {
  const userData = useSelector((state: any) => state.user?.userData)

  const role = userData?.role?.id
  const dispatch = useDispatch()
  const selectedCustomerName = useSelector(selectCustomerName)
  const [getCustomerOwnerData, setgetCustomerOwnerData] = useState<any[]>([])
  const [getUser] = useGetCustomersOwnersMutation()
  const [quickBookButtonClick] = useQuickBookMutation()
  const imageData = userData?.imageDto?.imageData
  const UserName =
    userData && userData?.firstName && userData?.lastName
      ? userData.firstName + ' ' + userData.lastName
      : ''
  const imageUrl = imageData ? `data:image/jpeg;base64,${imageData}` : '/assets/images/user12.png'

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

  // const handleButtonClick = async () => {
  //   try {
  //     const response = await quickBookButtonClick({}).unwrap()
  //   } catch (error) {
  //     const { message } = error as ErrorResponse
  //     console.error('Error fetching moorings data:', error)
  //   }
  // }

  const handleButtonClick = () => {
    const quickBooksLoginUrl =
      'https://accounts.intuit.com/app/sign-in?app_group=QBO&asset_alias=Intuit.devx.appsdotcomreverseproxy&redirect_uri=https%3A%2F%2Fappcenter.intuit.com%2Fapp%2Fconnect%2Foauth2%3Fclient_id%3DABqtQJ4Cl5VN8scyoM7WgCNiDwir0IyrptqjpltxU1JQtKzfKS%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520email%2520phone%2520address%2520com.intuit.quickbooks.accounting%2520com.intuit.quickbooks.payment%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8080%252Foauth2redirect%26state%3D806d5988-4d76-42d7-9560-54465369475d&partner_uid_button=google&appfabric=true'

    window.open(quickBooksLoginUrl, 'QuickBooksWindow', 'width=800,height=600,scrollbars=yes')
  }

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
          <>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                marginRight: '10px',
              }}
              onClick={handleButtonClick}>
              <img
                src="/assets/images/quickBook.png"
                alt="Button Icon"
                style={{ width: '150px', height: '35px' }}
              />
            </button>
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
          </>
        )}
        {userData && (
          <>
            <Avatar image={imageUrl} shape="circle" />
            <span style={{ color: '#000000', fontSize: '16px', fontWeight: 400 }}>{UserName}</span>
          </>
        )}
        <HeaderProfile customer={userData} />
      </div>
    </div>
  )
}

export default Header
