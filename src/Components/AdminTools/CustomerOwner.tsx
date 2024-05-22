import { useCallback, useEffect, useMemo, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import { properties } from '../Utils/MeassageProperties'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { CustomerPayload, GetUserResponse } from '../../Type/ApiTypes'
import Header from '../Layout/LayoutComponents/Header'
import useMetaData from '../CommonComponent/MetaDataComponent'
import { Role } from '../../Type/CommonType'
import { useGetUsersMutation } from '../../Services/AdminTools/AdminToolsApi'
import AddNewCustomer from './AddNewCustomer'
import { InputText } from 'primereact/inputtext'
import './CustomerOwner.module.css'
import { customerAdminUser } from '../Utils/CustomData'
import InputTextWithHeader from '../CommonComponent/Table/InputTextWithHeader'

const CustomerOwner = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [editMode, setEditMode] = useState(false)
  const [isRowClick, setIsRowClick] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>()
  const { getMetaData } = useMetaData()
  const [rolesData, setRolesData] = useState<Role[]>()
  const [selectRole, setSelectRole] = useState()
  const [customerAdminId, setCustomerAdminId] = useState('')
  const [getUser] = useGetUsersMutation()
  const [getCustomerOwnerData, setgetCustomerOwnerData] = useState<CustomerPayload[]>([])
  const [getCustomerOwnerUserData, setgetCustomerOwnerUserData] = useState<CustomerPayload[]>([])
  const [searchText, setSearchText] = useState('')
  const [searchUsersText, setSearchUsersText] = useState('')

  const handleModalClose = () => {
    setModalVisible(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleUsersSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUsersText(e.target.value)
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
        fontWeight: 500,
        onClick: (rowData) => handleEditButtonClick(rowData),
      },
    ],
    headerStyle: {
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #C0C0C0',
      color: '#000000',
      fontWeight: 500,
    },
    style: { borderBottom: '1px solid #D5E1EA' },
  }

  const columnStyle = {
    width: '10vw',
    borderBottom: '1px solid #D5E1EA',
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

  const customerOwnerUserTableColumnStyle = {
    borderBottom: '1px solid #D5E1EA',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: 500,
  }

  const customerOwnerUserTableColumn = useMemo(
    () => [
      { id: 'id', label: 'ID', style: customerOwnerUserTableColumnStyle },
      { id: 'name', label: 'Name', style: customerOwnerUserTableColumnStyle },
      { id: 'email', label: 'Email', style: customerOwnerUserTableColumnStyle },
      { id: 'phoneNumber', label: 'Phone', style: customerOwnerUserTableColumnStyle },
      { id: 'role', label: 'Role', style: customerOwnerUserTableColumnStyle },
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
      const response = await getUser({ searchText: searchText }).unwrap()
      const { status, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content?.content)) {
        if (content?.content.length > 0) {
          setgetCustomerOwnerData(content?.content)
        } else {
          setgetCustomerOwnerData([])
        }
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  const getCustomerAdminsUsers = async (id: any) => {
    try {
      const response = await getUser({ customerAdminId: id, searchText: searchUsersText }).unwrap()
      const { status, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content?.content)) {
        if (content?.content.length > 0) {
          setgetCustomerOwnerUserData(content?.content)
          // setIsRowClick(true)
          setSelectedRow(id)
          setCustomerAdminId(id)
        } else {
          setgetCustomerOwnerUserData([])
          setIsRowClick(false)
        }
      } else {
        setIsRowClick(false)
        setgetCustomerOwnerUserData([])
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  useEffect(() => {
    getCustomerAdminsUsers(customerAdminId)
  }, [searchUsersText, isRowClick])

  useEffect(() => {
    getUserHandler()
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate, searchText])

  return (
    <div className={modalVisible ? 'backdrop-blur-lg' : ''}>
      <Header header="MOORMANAGE/Permission" />

      <div className="flex mr-12 justify-end">
        {/* Commenting for now, will use later */}
        {/* <div className="mt-8 mr-5 relative">
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
        </div> */}

        <div className="mt-8">
          <CustomModal
            buttonText={'ADD NEW'}
            onHide={handleModalClose}
            dialogStyle={{ marginTop: '120px', marginLeft: '180px', borderRadius: '20px' }}
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
            borderRadius: '15px',
            border: '1px solid #D5E1EA',
            backgroundColor: '#FFFFFF',
            marginLeft: '40px',
          }}>
          <div className="text-md font-semibold rounded-t-md bg-[#00426F]">
            <h1 className="p-4 text-white">{properties.CustomersOwner}</h1>
          </div>
          <InputTextWithHeader
            value={searchText}
            onChange={handleSearch}
            placeholder="Search by name, ID, phone no.... "
            inputTextStyle={{
              width: '38vw',
              minWidth: '38vw',
              height: '44px',
              padding: '0 2rem 0 2.5rem',
              border: '1px solid #C5D9E0',
              fontSize: '14px',
              color: '#000000',
              borderRadius: '4px',
              minHeight: '44px',
              fontWeight: 400,
              backgroundColor: '#FFFFFF',
            }}
          />
          <div
            data-testid="customer-admin-data"
            // className="custom-scrollbar"
            style={{
              height: '600px',
              minHeight: 'calc(40vw - 600px)',
              width: '40vw',
              minWidth: '40vw',
              overflow: 'auto',
            }}>
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
                  fontWeight: 600,
                  backgroundColor: '#D9D9D9',
                  cursor: 'pointer',
                  marginLeft: '20px',
                  marginRight: '20px',
                  width: '37vw',
                  minWidth: '37vw',
                }}
                scrollable={true}
                columns={customerOwnerTableColumn}
                onRowClick={(e) => {
                  getCustomerAdminsUsers(e.data.id)
                }}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
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
            borderRadius: '15px',
            border: '1px solid #D5E1EA',
            backgroundColor: '#FFFFFF',
            marginRight: '50px',
          }}>
          <div className="text-md font-semibold rounded-t-md bg-[#00426F]">
            <h1 className="p-4 text-white">{properties.CustomerOwnerUsers}</h1>
          </div>
          <InputTextWithHeader
            value={searchUsersText}
            onChange={handleUsersSearch}
            placeholder="Search by name, ID, Email, Role, phone no..."
            inputTextStyle={{
              width: '42vw',
              minWidth: '42vw',
              height: '44px',
              border: '1px solid #C5D9E0',
              padding: '0 2rem 0 2.5rem',
              fontSize: '14px',
              color: '#000000',
              borderRadius: '4px',
              minHeight: '44px',
              fontWeight: 400,
              backgroundColor: '#FFFFFF',
            }}
          />
          <div
            style={{
              height: '600px',
              minHeight: 'calc(40vw - 600px)',
              overflow: 'auto',
            }}
            data-testid="customer-admin-users-table"
            // className="custom-scrollbar"
          >
            {getCustomerOwnerUserData.length > 0 ? (
              <DataTableComponent
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 400,
                  backgroundColor: '#FFFFFF',
                  marginLeft: '20px',
                  marginRight: '20px',
                  width: '41vw',
                  minWidth: '41vw',
                }}
                scrollable={true}
                data={getCustomerOwnerUserData}
                columns={customerOwnerUserTableColumn}
                actionButtons={ActionButtonColumn}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
              />
            ) : (
              <div className="text-center mt-40">
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-32 mx-auto mb-4"
                />
                <p className="text-gray-500">No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerOwner
