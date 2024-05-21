import { useCallback, useEffect, useMemo, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import { properties } from '../Utils/MeassageProperties'
import { Dropdown } from 'primereact/dropdown'

import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { CustomerPayload, GetUserResponse } from '../../Type/ApiTypes'
import Header from '../Layout/LayoutComponents/Header'
import useMetaData from '../CommonComponent/MetaDataComponent'
import { Role } from '../../Type/CommonType'
import { CustomersHeader, TechniciansHeader } from '../Utils/DataTableHeader'
import { useGetUsersMutation } from '../../Services/AdminTools/AdminToolsApi'
import AddNewCustomer from './AddNewCustomer'

const CustomerOwner = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [editMode, setEditMode] = useState(false)
  const [isRowClick, setIsRowClick] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>()
  const { getMetaData } = useMetaData()
  const [rolesData, setRolesData] = useState<Role[]>()
  const [selectRole, setSelectRole] = useState()
  const [firstUserId, setFirstUserId] = useState('')
  const [customerAdminId, setCustomerAdminId] = useState(firstUserId)
  const [getUser] = useGetUsersMutation()
  const [getCustomerOwnerData, setgetCustomerOwnerData] = useState<CustomerPayload[]>([])
  const [getCustomerOwnerUserData, setgetCustomerOwnerUserData] = useState<CustomerPayload[]>([])

  const handleModalClose = () => {
    setModalVisible(false)
  }

  const handleEditButtonClick = (rowData: any) => {
    setSelectedCustomer(rowData)
    setModalVisible(true)
    setEditMode(true)
  }

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
        fontWeight: 400,
        onClick: (rowData) => handleEditButtonClick(rowData),
      },
    ],
    headerStyle: {
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #C0C0C0',
      color: '#000000',
      fontWeight: 400,
    },
    style: { borderBottom: '1px solid #D5E1EA' },
  }

  const columnStyle = {
    borderBottom: '1px solid #C0C0C0',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: 500,
  }

  const customerOwnerTableColumn = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: columnStyle,
      },
      {
        id: 'name',
        label: 'Name',
        style: columnStyle,
      },
      {
        id: 'phoneNumber',
        label: 'Phone',
        style: columnStyle,
      },
    ],
    [],
  )

  const customerOwnerUserTableColumn = useMemo(
    () => [
      { id: 'id', label: 'ID', style: columnStyle },
      { id: 'name', label: 'Name', style: columnStyle },
      { id: 'email', label: 'Email', style: columnStyle },
      { id: 'phoneNumber', label: 'Phone', style: columnStyle },
      { id: 'role', label: 'Role', style: columnStyle },
    ],
    [],
  )

  const fetchDataAndUpdate = useCallback(async () => {
    const { rolesData } = await getMetaData()
    if (rolesData !== null) {
      setRolesData(rolesData)
    }
  }, [])

  const getUserHandler = async () => {
    try {
      const response = await getUser({}).unwrap()
      const { status, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content?.content) && content?.content.length > 0) {
        setgetCustomerOwnerData(content?.content)

        // Set data for the first user by default
        const firstUser = content?.content[0]
        setFirstUserId(firstUser.id)
        console.log('firstUserId in function', firstUserId)
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  const getCustomerAdminsUsers = async (id: any) => {
    try {
      const response = await getUser({ customerAdminId: id }).unwrap()
      const { status, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content?.content)) {
        setgetCustomerOwnerUserData(content?.content)
        setIsRowClick(true)
        setSelectedRow(id)
        setCustomerAdminId(id)
        console.log('customerAdminId 1 is ', customerAdminId)
      } else {
        setIsRowClick(false)
        setgetCustomerOwnerUserData([])
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  useEffect(() => {
    getCustomerAdminsUsers(firstUserId)
  }, [firstUserId])

  useEffect(() => {
    getUserHandler()
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  return (
    <>
      <Header header="MOORMANAGE/Permission" />

      <div className="flex mr-12 justify-end">
        <div className="mt-8 mr-5 relative">
          <Dropdown
            value={selectRole}
            onChange={(e) => setSelectRole(e.value)}
            options={rolesData}
            optionLabel="name"
            editable
            placeholder="Select Role"
            style={{
              width: '172px',
              height: '44px',
              minHeight: '44px',
              paddingLeft: '2rem',
              border: '1px solid #D5E1EA',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          />
          <img
            src="/assets/images/filter.svg"
            alt="filter Icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4"
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="mt-8">
          <CustomModal
            buttonText={'ADD NEW'}
            onHide={handleModalClose}
            children={
              <AddNewCustomer
                customerAdminId={customerAdminId ? customerAdminId : ''}
                customerData={selectedCustomer}
                editMode={editMode}
                getUser={getUserHandler}
                closeModal={() => {}}
                setModalVisible={setModalVisible}
                setIsVisible={() => {}}
              />
            }
            headerText={<span className="font-large text-2xl text-[#000000] ml-4">New User</span>}
            visible={modalVisible}
            onClick={() => {
              setModalVisible(true)
            }}
          />
        </div>
      </div>

      <div className="flex gap-10 ml-8 mt-10">
        <div
          style={{
            height: 'calc(40vw - 10px)',
            minHeight: '700px',
            width: '33vw',
            minWidth: '33vw',
            borderRadius: '15px',
            border: '1px solid #D5E1EA',
            backgroundColor: '#FFFFFF',
            marginLeft: '40px',
          }}>
          <div className="text-md font-semibold rounded-t-md bg-[#00426F]">
            <h1 className="p-4 text-white">{properties.CustomersOwner}</h1>
          </div>
          <div data-testid="customer-admin-data">
            {getCustomerOwnerData.length === 0 ? (
              <div className="text-center mt-40">
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-32 mx-auto mb-4"
                />
                <p className="text-gray-500">No data available</p>
              </div>
            ) : (
              <DataTableComponent
                data={getCustomerOwnerData}
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 500,
                  backgroundColor: '#D9D9D9',
                  cursor: 'pointer',
                }}
                scrollable={true}
                columns={customerOwnerTableColumn}
                header={CustomersHeader}
                onRowClick={(e) => {
                  getCustomerAdminsUsers(e.data.id)
                }}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
                rowStyle={(rowData) => ({
                  backgroundColor: selectedRow === rowData.id ? 'black' : 'red',
                })}
              />
            )}
          </div>
        </div>

        <div
          style={{
            flexGrow: 1,
            height: 'calc(40vw - 10px)',
            minHeight: '700px',
            // width: '35vw',
            // minWidth: '35vw',
            borderRadius: '15px',
            border: '1px solid #D5E1EA',
            backgroundColor: '#FFFFFF',
            marginRight: '50px',
          }}>
          <div className="text-md font-semibold rounded-t-md bg-[#00426F]">
            <h1 className="p-4 text-white">{properties.CustomerOwnerUsers}</h1>
          </div>
          <div data-testid="customer-admin-users-table">
            {!isRowClick ? (
              <div className="text-center mt-40">
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-32 mx-auto mb-4"
                />
                <p className="text-gray-500">No data available</p>
              </div>
            ) : (
              <DataTableComponent
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 400,
                  backgroundColor: '#D9D9D9',
                }}
                scrollable={true}
                data={isRowClick ? getCustomerOwnerUserData : undefined}
                columns={customerOwnerUserTableColumn}
                header={TechniciansHeader}
                actionButtons={ActionButtonColumn}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerOwner
